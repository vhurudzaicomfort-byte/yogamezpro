import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Icon } from '../icons/Icon';
import { GameIcon } from '../icons/games/GameIcon';
import { GAMES } from '../config/catalogue';
import { BOARD, CAMPAIGN, LOOP, RULES, WEEKLY_PRIZES, YOU, currentPhase, fmt, param, type Phase } from './campaignData';
import s from './Campaign.module.css';

const game = GAMES.find((g) => g.id === CAMPAIGN.game.id) ?? GAMES[0];

/* ---------- Decorative pieces ---------- */
export function Ribbon() {
  return (
    <>
      <span className={s.ribbonV} aria-hidden="true" />
      <span className={s.ribbonH} aria-hidden="true" />
      <span className={s.bow} aria-hidden="true"><span className={s.knot} /></span>
    </>
  );
}
function Sparkles() {
  const pts = [[8, 12], [62, 8], [88, 30], [40, 22], [74, 70], [14, 78]];
  return <>{pts.map(([x, y], i) => <span key={i} className={s.sparkle} style={{ left: `${x}%`, top: `${y}%` }} aria-hidden="true">✦</span>)}</>;
}
function Countdown({ d, h, m, sec }: { d: string; h: string; m: string; sec: string }) {
  return (
    <div className={s.count} aria-label={`${d} days ${h} hours ${m} minutes left`}>
      {[[d, 'Days'], [h, 'Hrs'], [m, 'Min'], [sec, 'Sec']].map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}
    </div>
  );
}
function BossMeter() {
  const max = CAMPAIGN.yourBest * 1.22;
  return (
    <div className={s.meter}>
      <div className={s.meterRow}><span>Your best <b>{fmt(CAMPAIGN.yourBest)}</b></span><span>Boss <b>{fmt(CAMPAIGN.bossScore)}</b></span></div>
      <div className={s.track}>
        <span className={s.fill} style={{ width: `${(CAMPAIGN.yourBest / max) * 100}%` }} />
        <span className={s.bossMark} style={{ left: `${(CAMPAIGN.bossScore / max) * 100}%` }} />
      </div>
    </div>
  );
}

/* ---------- Snow + desktop canvas ---------- */
export function CampaignOverlay() {
  if (!CAMPAIGN.enabled) return null;
  const flakes = Array.from({ length: 46 }, (_, i) => {
    const r = (n: number) => ((Math.sin(i * 99.13 + n) + 1) / 2);
    const size = 2 + r(1) * 4;
    return <i key={i} style={{ left: `${r(2) * 100}%`, top: `${r(5) * 100}%`, width: size, height: size, animationDuration: `${9 + r(3) * 10}s`, animationDelay: `-${r(4) * 12}s` }} />;
  });
  return (
    <>
      <div className="xmas-snow" aria-hidden="true">{flakes}</div>
      <div className="xmas-decor" aria-hidden="true">
        <div className="side left">
          <span className="kicker">{CAMPAIGN.name}</span>
          <h2>Beat the <span>Boss</span></h2>
          <p>{CAMPAIGN.dates}</p>
        </div>
        <div className="side right">
          <div className="loop">{LOOP.map((l) => <div key={l.k}><b>{l.k}</b><span>{l.t}</span></div>)}</div>
        </div>
      </div>
    </>
  );
}

/* ---------- Home banner (teaser / live / results) ---------- */
export function CampaignBanner() {
  const navigate = useNavigate();
  const phase: Phase = currentPhase();
  if (!CAMPAIGN.enabled) return null;
  return (
    <section className={`${s.festive} ${s.banner}`} aria-label={`${CAMPAIGN.name} ${CAMPAIGN.challenge}`}>
      <Ribbon /><Sparkles />
      <div className={s.bannerTop}>
        <span className={s.kicker}><Icon name="sparkle" size={13} />{CAMPAIGN.name}</span>
        {phase === 'live' && <span className={`${s.chip} ${s.chipLive}`}>Week {CAMPAIGN.week} live</span>}
        {phase === 'teaser' && <span className={s.chip}>Starts 1 Dec</span>}
        {phase === 'results' && <span className={s.chip}>Winners out</span>}
      </div>
      <h2 className={s.title}>Beat the <em>Boss</em></h2>
      {phase === 'teaser' && (
        <>
          <p className={s.copy}>A weekly featured game. One Boss Score. Beat it to qualify for weekly prizes.</p>
          <Countdown d="05" h="14" m="32" sec="08" />
          <Button variant="primary" size="md" iconLeft="bell" onClick={() => navigate('/beat-the-boss?phase=teaser')}>Remind me</Button>
        </>
      )}
      {phase === 'live' && (
        <>
          <p className={s.copy}>This week: <b>{game.title}</b>. Score above the Boss before {CAMPAIGN.closes}.</p>
          <BossMeter />
          <Button variant="primary" size="md" iconLeft="play" onClick={() => navigate('/beat-the-boss')}>Take on the Boss</Button>
        </>
      )}
      {phase === 'results' && (
        <>
          <p className={s.copy}>Week {CAMPAIGN.week} results are validated. See who beat the Boss and won.</p>
          <Button variant="primary" size="md" iconLeft="trophy" onClick={() => navigate('/beat-the-boss?phase=results&popup=winners')}>See winners</Button>
        </>
      )}
    </section>
  );
}

/* ---------- Beat the Boss page ---------- */
export function BeatTheBoss() {
  const navigate = useNavigate();
  const phase = currentPhase();
  return (
    <div className={s.page}>
      <section className={s.festive}>
        <Ribbon /><Sparkles />
        <span className={s.kicker}><Icon name="sparkle" size={13} />{phase === 'teaser' ? 'Starts 1 December' : `Week ${CAMPAIGN.week} · closes ${CAMPAIGN.closes}`}</span>
        <h2 className={s.title}>Beat the <em>Boss</em></h2>
        {phase === 'teaser' ? (
          <>
            <p className={s.copy}>{CAMPAIGN.name} runs {CAMPAIGN.dates}. A new featured game and Boss Score every week.</p>
            <Countdown d="05" h="14" m="32" sec="08" />
            <Button variant="primary" iconLeft="bell">Remind me</Button>
          </>
        ) : (
          <>
            <div className={s.statRow}>
              <div className={`${s.stat} ${s.boss}`}><span>Boss Score</span><b>{fmt(CAMPAIGN.bossScore)}</b></div>
              <div className={`${s.stat} ${s.you}`}><span>Your best</span><b>{fmt(CAMPAIGN.yourBest)}</b></div>
            </div>
            <BossMeter />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <GameIcon game={game.icon} size={52} />
              <Button variant="primary" iconLeft="play" onClick={() => navigate(`/game/${game.id}`)}>Play {game.title}</Button>
            </div>
          </>
        )}
      </section>

      <section className={s.section}>
        <div className={s.sectionHead}><h3>How it works</h3><span>Play · Beat · Win</span></div>
        <div className={s.loop}>{LOOP.map((l) => <div key={l.k} className={s.loopCard}><b>{l.k}</b><p>{l.t}</p></div>)}</div>
      </section>

      {phase !== 'teaser' && (
        <section className={s.section}>
          <div className={s.sectionHead}><h3>Challenge ranking</h3><span>Best valid score</span></div>
          <div className={s.board}>
            {BOARD.map((r) => (
              <div key={r.rank} className={s.row}><span className={s.r}>{r.rank}</span><span>{r.name}</span><span className={s.ok}>Beat Boss</span><span className={s.s}>{fmt(r.score)}</span></div>
            ))}
            <div className={`${s.row} ${s.me}`}><span className={s.r}>{YOU.rank}</span><span><b>{YOU.name}</b></span><span className={s.ok}>Beat Boss</span><span className={s.s}>{fmt(YOU.score)}</span></div>
          </div>
        </section>
      )}

      <section className={s.section}>
        <div className={s.sectionHead}><h3>Weekly prizes</h3><span>Top 5 each week</span></div>
        <div className={s.prizes}>
          {WEEKLY_PRIZES.map((p) => (
            <div key={p.place} className={s.prize}><span className={s.place}>{p.place}</span><strong>{p.prize}<small>{p.place} place</small></strong><span className={s.tag}>Weekly</span></div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <div className={s.sectionHead}><h3>Rules</h3><span>Fair & verifiable</span></div>
        <div className={s.rules}>{RULES.map((r) => <div key={r.k} className={s.rule}><b>{r.k}</b><p>{r.t}</p></div>)}</div>
      </section>
      <p className={s.note}>The existing daily leaderboard and prizes stay unchanged. Prizes and rules subject to approval.</p>
    </div>
  );
}

/* ---------- Popups (?popup=teaser|launch|beaten|eligibility|winners) ---------- */
export function CampaignPopups() {
  const navigate = useNavigate();
  const [which, setWhich] = useState<string | null>(() => param('popup'));
  const close = () => setWhich(null);
  const go = (to: string) => { close(); navigate(to); };
  const colors = ['#e92230', '#f5c344', '#5bc2e7', '#ffffff', '#ff5a66'];
  const confetti = Array.from({ length: 26 }, (_, i) => (
    <i key={i} style={i % 2 ? { left: i % 4 === 1 ? `${2 + (i % 3) * 2}%` : `${90 + (i % 3) * 2}%`, top: `${18 + ((i * 29) % 70)}%`, background: colors[i % 5], transform: `rotate(${i * 41}deg)` } : { left: `${(i * 37) % 100}%`, top: `${1 + ((i * 7) % 9)}%`, background: colors[i % 5], transform: `rotate(${i * 41}deg)` }} />
  ));

  const body = (() => {
    switch (which) {
      case 'teaser': return (
        <>
          <span className={s.kicker}>Coming 1 December</span>
          <h2 className={s.title}>{CAMPAIGN.name}</h2>
          <div className={`${s.popIcon} ${s.red}`}><Icon name="gift" size={40} variant="solid" /></div>
          <p className={s.copy}>Beat the Boss is almost here. A weekly featured game, one target score, and weekly prizes for the best players.</p>
          <Countdown d="05" h="14" m="32" sec="08" />
          <div className={s.popActions}><Button variant="primary" block iconLeft="bell" onClick={close}>Remind me</Button><Button variant="ghost" block onClick={close}>Maybe later</Button></div>
        </>
      );
      case 'launch': return (
        <>
          <span className={s.kicker}>Now live · Week 1</span>
          <h2 className={s.title}>Beat the <em>Boss</em></h2>
          <div className={s.popIcon}><GameIcon game={game.icon} size={64} /></div>
          <p className={s.copy}>This week's featured game is <b>{game.title}</b>. Score above <b>{fmt(CAMPAIGN.bossScore)}</b> before {CAMPAIGN.closes} to qualify.</p>
          <div className={s.popActions}><Button variant="primary" block iconLeft="play" onClick={() => go('/beat-the-boss')}>Take on the Boss</Button><Button variant="ghost" block onClick={close}>Not now</Button></div>
        </>
      );
      case 'beaten': return (
        <>
          <div className={s.confetti}>{confetti}</div>
          <span className={s.kicker}>Qualified</span>
          <h2 className={s.title}>You beat the Boss!</h2>
          <div className={s.popScore}>{fmt(CAMPAIGN.yourBest)}</div>
          <p className={s.copy}>Boss Score {fmt(CAMPAIGN.bossScore)}. Your best valid score counts. Keep playing to climb the challenge ranking.</p>
          <div className={s.popActions}><Button variant="primary" block iconLeft="play" onClick={close}>Play again</Button><Button variant="ghost" block onClick={() => go('/beat-the-boss')}>View ranking</Button></div>
        </>
      );
      case 'eligibility': return (
        <>
          <span className={s.kicker}>Stay eligible</span>
          <h2 className={s.title}>Keep your pack active</h2>
          <div className={`${s.popIcon} ${s.red}`}><Icon name="shield" size={38} variant="solid" /></div>
          <p className={s.copy}>Daily pack: at least 6 successful renewals in a 7-day week. Weekly pack: your paid subscription must cover the qualifying week.</p>
          <div className={s.popActions}><Button variant="primary" block onClick={close}>Got it</Button></div>
        </>
      );
      case 'winners': return (
        <>
          <div className={s.confetti}>{confetti}</div>
          <span className={s.kicker}>Week {CAMPAIGN.week} · validated</span>
          <h2 className={s.title}>Boss beaters</h2>
          <div className={s.winners}>
            {BOARD.map((r, i) => <div key={r.rank}><b>{WEEKLY_PRIZES[i].place}</b><span>{r.name}</span><span>{WEEKLY_PRIZES[i].prize}</span></div>)}
          </div>
          <div className={s.popActions}><Button variant="primary" block iconLeft="play" onClick={() => go('/beat-the-boss')}>Next challenge</Button></div>
        </>
      );
      default: return null;
    }
  })();

  return (
    <Modal open={Boolean(body)} onClose={close} bare size="sm" title={CAMPAIGN.challenge}>
      <div className={s.pop} data-xmas-pop>
        <Ribbon /><Sparkles />
        <button className={s.popClose} onClick={close} aria-label="Close"><Icon name="close" size={18} /></button>
        {body}
      </div>
    </Modal>
  );
}
