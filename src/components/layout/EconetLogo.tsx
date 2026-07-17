import light from '../../assets/econet.svg';
import dark from '../../assets/econet-dark.svg';

/**
 * Official Econet Wireless mark. Two supplied variants — light-bg (blue) and
 * dark-bg — swapped by theme via CSS so it stays legible on both canvases.
 */
export function EconetLogo({ height = 26 }: { height?: number }) {
  return (
    <picture>
      <img
        src={dark}
        alt="Econet Wireless"
        height={height}
        style={{ height, width: 'auto' }}
        data-econet="dark"
      />
      <img
        src={light}
        alt=""
        aria-hidden="true"
        height={height}
        style={{ height, width: 'auto' }}
        data-econet="light"
      />
    </picture>
  );
}
