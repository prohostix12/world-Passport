'use client';
import Image from 'next/image';

interface LogoProps {
  size?: number;
  animate?: boolean;
  className?: string;
}

export default function Logo({ size = 44, className = '' }: LogoProps) {
  return (
    <div
      className={`relative flex-shrink-0 ml-0 mr-auto ${className}`}
      style={{ height: size, overflow: 'visible' }}
    >
      <Image
        src="/assets/logo2.png"
        alt="World Passport"
        width={420}
        height={70}
        className="object-contain"
        style={{
          height: '150px',
          width: 'auto',
          maxWidth: '350px',
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        priority
      />
    </div>
  );
}
