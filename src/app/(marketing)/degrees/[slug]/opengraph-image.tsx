import { ImageResponse } from 'next/og';
import { getDegreeBySlug } from '@/lib/mock-data';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const degree = getDegreeBySlug(slug);
  
  if (!degree) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
          }}
        >
          Degree Not Found
        </div>
      ),
      size
    );
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };
  
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 60,
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Header with Logo Area */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: '600',
                opacity: 0.95,
                letterSpacing: '-0.5px',
              }}
            >
              My College Sathi
            </div>
            <div
              style={{
                fontSize: 16,
                opacity: 0.8,
                marginTop: 4,
              }}
            >
              Online Degree Admissions
            </div>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '12px 24px',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {degree.category}
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {/* Degree Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              lineHeight: 1.1,
              marginBottom: 16,
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            Online {degree.name}
          </div>
          
          {/* Full Name */}
          <div
            style={{
              fontSize: 32,
              opacity: 0.95,
              marginBottom: 32,
              fontWeight: '500',
            }}
          >
            {degree.full_name}
          </div>

          {/* Key Details */}
          <div
            style={{
              display: 'flex',
              gap: 32,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '16px 24px',
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  opacity: 0.9,
                  marginBottom: 4,
                }}
              >
                Fee Range
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                }}
              >
                {formatCurrency(degree.fee_range_min)} - {formatCurrency(degree.fee_range_max)}
              </div>
            </div>
            
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '16px 24px',
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  opacity: 0.9,
                  marginBottom: 4,
                }}
              >
                Duration
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                }}
              >
                {degree.duration_text}
              </div>
            </div>

            {degree.emi_available && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '16px 24px',
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    opacity: 0.9,
                    marginBottom: 4,
                  }}
                >
                  EMI Options
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                  }}
                >
                  Available
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 40,
            paddingTop: 24,
            borderTop: '2px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <div
            style={{
              fontSize: 18,
              opacity: 0.9,
            }}
          >
            UGC-Recognized • 100% Valid Degree • Placement Assistance
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: '600',
              opacity: 0.95,
            }}
          >
            mycollegesathi.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
