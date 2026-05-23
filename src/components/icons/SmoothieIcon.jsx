const SmoothieIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="smoothie-icon"
  >
    {/* Vaso */}
    <path d="M18 8H6l1.5 12a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1L18 8z" />
    {/* Detalle superior */}
    <path d="M6 8h12M9 8V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
    {/* Popote/Pajita */}
    <path d="M15 3l-1.5 5" />
    {/* Detalle interno/textura */}
    <path d="M9 14l2 2 4-4" />
  </svg>
);

export default SmoothieIcon;