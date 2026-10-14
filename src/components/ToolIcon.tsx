import type { ReactNode } from 'react';

const brandIcons: Record<string, string> = {
  Python: 'python',
  Bash: 'gnubash',
  JavaScript: 'javascript',
  'C / C++': 'cplusplus',
  Fortran: 'fortran',
  PyTorch: 'pytorch',
  TensorFlow: 'tensorflow',
  'scikit-learn': 'scikitlearn',
  'Hugging Face': 'huggingface',
  Git: 'git',
  GitHub: 'github',
  Linux: 'linux',
};

// Original illustrative symbols for scientific tools and communication.
const scientificIcons: Record<string, ReactNode> = {
  GROMACS: (
    <>
      <path d="m6 7 12 10M6 17 12-10M6 7v10m12-10v10" />
      <circle cx="6" cy="7" r="3" />
      <circle cx="18" cy="17" r="3" />
      <circle cx="6" cy="17" r="2" />
      <circle cx="18" cy="7" r="2" />
    </>
  ),
  LAMMPS: (
    <>
      <path d="m12 3 8 4v10l-8 4-8-4V7Zm0 8 8-4M12 11 4 7m8 4v10" />
      <circle cx="12" cy="11" r="2" />
    </>
  ),
  VMD: (
    <>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  PyMOL: (
    <>
      <path d="m6 6 6 6 6-6m-6 6v7" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="12" cy="19" r="3" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  'Scientific communication': (
    <>
      <path d="M4 4h16v12H9l-5 4V4Z" />
      <path d="M8 8h8M8 12h5" />
    </>
  ),
};

export function ToolIcon({ name }: { name: string }) {
  const brand = brandIcons[name];
  if (brand)
    return (
      <span
        className="tool-icon tool-icon-brand"
        aria-hidden="true"
        style={{ maskImage: `url(/assets/tool-icons/${brand}.svg)` }}
      />
    );
  return (
    <svg
      className="tool-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {scientificIcons[name]}
    </svg>
  );
}
