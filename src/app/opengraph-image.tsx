import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #050B1A 0%, #071534 45%, #0A1B44 100%)',
          position: 'relative',
          color: 'white',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
        }}
      >
        {/* Glow blobs */}
        <div
          style={{
            position: 'absolute',
            width: 520,
            height: 520,
            borderRadius: 520,
            top: -140,
            right: -120,
            background: 'rgba(59,130,246,0.28)',
            filter: 'blur(90px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 520,
            height: 520,
            borderRadius: 520,
            bottom: -160,
            left: -140,
            background: 'rgba(99,102,241,0.22)',
            filter: 'blur(100px)',
          }}
        />

        {/* Card */}
        <div
          style={{
            width: 980,
            height: 420,
            borderRadius: 28,
            border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.06)',
            display: 'flex',
            padding: 48,
            gap: 40,
            alignItems: 'center',
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 28,
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="96"
              height="96"
              viewBox="0 0 128 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M64 28 22 46l42 18 42-18-42-18Zm-28 22v18c0 4 13 12 28 12s28-8 28-12V50l-28 12-28-12Z"
                fill="#ffffff"
              />
              <path
                d="M106 48v22c0 2-2 4-4 4s-4-2-4-4V52l8-4Z"
                fill="#93c5fd"
                fillOpacity="0.95"
              />
              <circle cx="102" cy="74" r="3.5" fill="#93c5fd" fillOpacity="0.95" />
            </svg>
          </div>

          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: -1 }}>
              My College Sathi
            </div>
            <div style={{ fontSize: 28, color: 'rgba(219,234,254,0.92)' }}>
              Find & compare online degrees. Get free counselling.
            </div>
            <div
              style={{
                marginTop: 6,
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              {['MBA', 'BBA', 'MCA', 'BCA', 'UGC Recognized'].map((t) => (
                <div
                  key={t}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 999,
                    fontSize: 18,
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.16)',
                    color: 'rgba(239,246,255,0.96)',
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

