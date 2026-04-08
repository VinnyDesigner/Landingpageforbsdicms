import svgPaths from "./svg-87a0ab3dc1";

export default function Group() {
  return (
    <div className="relative size-full">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 290.522 357.779">
        <g clipPath="url(#clip0_232_1679)" id="Group 2106257230">
          <g id="button">
            <mask fill="white" id="path-1-inside-1_232_1679">
              <path d={svgPaths.p15807b00} />
            </mask>
            <path d={svgPaths.p15807b00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p29cb18f0} fill="var(--stroke-0, #EAEAEA)" mask="url(#path-1-inside-1_232_1679)" />
          </g>
          <g filter="url(#filter0_d_232_1679)" id="Subtract">
            <path d={svgPaths.pd9a9200} fill="var(--fill-0, #F8F8F8)" />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="421.779" id="filter0_d_232_1679" width="354.522" x="-32" y="-20">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="12" />
            <feGaussianBlur stdDeviation="16" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_232_1679" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_232_1679" mode="normal" result="shape" />
          </filter>
          <clipPath id="clip0_232_1679">
            <rect fill="white" height="357.779" width="290.522" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}