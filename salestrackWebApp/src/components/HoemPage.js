import React from 'react';

const SalesTern = () => {
  return (
    <div style={{
      color: '#1e293b',
      backgroundColor: '#f8fafc',
      lineHeight: 1.5,
      fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px',
        }}>
          <a href="#" style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#2563eb',
            textDecoration: 'none',
          }}>
            <span style={{
              marginRight: '0.5rem',
              fontWeight: 800,
              fontSize: '1.75rem',
              background: 'linear-gradient(135deg, #2563eb, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              S
            </span>
            SalesTern
          </a>
          
          <nav style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <ul style={{
              display: 'flex',
              listStyle: 'none',
              marginRight: '1.5rem',
            }}>
              <li style={{ margin: '0 1rem' }}><a href="#" style={{ fontWeight: 500, transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }}>Features</a></li>
              <li style={{ margin: '0 1rem' }}><a href="#" style={{ fontWeight: 500, transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }}>Pricing</a></li>
              <li style={{ margin: '0 1rem' }}><a href="#" style={{ fontWeight: 500, transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }}>Resources</a></li>
              <li style={{ margin: '0 1rem' }}><a href="#" style={{ fontWeight: 500, transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }}>About</a></li>
            </ul>
            
            <a href="#" style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              borderRadius: '4px',
              fontWeight: 500,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: 'white',
              color: '#2563eb',
              border: '1px solid #2563eb',
              textDecoration: 'none',
              marginRight: '10px',
            }}>
              Log In
            </a>
            
            <a href="#" style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              borderRadius: '4px',
              fontWeight: 500,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: '#2563eb',
              color: 'white',
              textDecoration: 'none',
            }}>
              Start Free Trial
            </a>
            
            <div style={{
              display: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              '@media (max-width: 768px)': {
                display: 'block',
              }
            }}>
              ☰
            </div>
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("/api/placeholder/1920/1080") center/cover',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '4rem',
        }}>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #2563eb, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Supercharge Your Sales Team Performance
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#64748b',
              marginBottom: '2rem',
            }}>
              SalesTern helps sales teams close more deals with AI-powered insights, streamlined workflows, and actionable analytics.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
            }}>
              <a href="#" style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                fontWeight: 500,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: '#2563eb',
                color: 'white',
                textDecoration: 'none',
              }}>
                Get Started - It's Free
              </a>
              <a href="#" style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                fontWeight: 500,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: 'white',
                color: '#2563eb',
                border: '1px solid #2563eb',
                textDecoration: 'none',
              }}>
                Schedule a Demo
              </a>
            </div>
          </div>
          
          <div style={{
            flex: 1,
            position: 'relative',
          }}>
            <img 
              src="/api/placeholder/600/400" 
              alt="SalesTern Dashboard" 
              style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section style={{
        padding: '5rem 0',
        backgroundColor: 'white',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
          }}>
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: 700,
              marginBottom: '1rem',
            }}>
              Elevate Your Sales Process
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#64748b',
              maxWidth: '700px',
              margin: '0 auto',
            }}>
              Discover how SalesTern transforms your sales operations with powerful features designed for modern sales teams.
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
          }}>
            {[
              {
                icon: '📊',
                title: 'AI Sales Forecasting',
                description: 'Leverage machine learning algorithms to predict sales outcomes with up to 95% accuracy, helping you meet and exceed targets.'
              },
              {
                icon: '🔍',
                title: 'Lead Scoring & Prioritization',
                description: 'Automatically identify your most promising leads and opportunities so your team can focus their efforts where it matters most.'
              },
              {
                icon: '📱',
                title: 'Mobile CRM Integration',
                description: 'Access all your sales data on the go with our powerful mobile app that seamlessly integrates with your existing CRM system.'
              },
              {
                icon: '🤝',
                title: 'Team Collaboration Tools',
                description: 'Enhance team communication with built-in messaging, document sharing, and deal collaboration features.'
              },
              {
                icon: '📈',
                title: 'Performance Analytics',
                description: 'Gain insights into individual and team performance with customizable dashboards and in-depth reporting.'
              },
              {
                icon: '🔄',
                title: 'Automated Workflows',
                description: 'Set up automated sales sequences, follow-ups, and task management to ensure nothing falls through the cracks.'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                padding: '2rem',
                borderRadius: '8px',
                backgroundColor: 'white',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  color: '#2563eb',
                  fontSize: '1.5rem',
                  marginBottom: '1.5rem',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  fontSize: '0.95rem',
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section style={{
        padding: '5rem 0',
        backgroundColor: '#f8fafc',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
          }}>
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: 700,
              marginBottom: '1rem',
            }}>
              Trusted by Industry Leaders
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#64748b',
              maxWidth: '700px',
              margin: '0 auto',
            }}>
              See how SalesTern has helped businesses of all sizes transform their sales processes and drive revenue growth.
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '2rem',
          }}>
            {[
              {
                content: "SalesTern has completely transformed how our sales team operates. We've seen a 42% increase in closed deals and reduced our sales cycle by nearly 30% in just six months.",
                author: "Sarah Johnson",
                title: "VP of Sales, TechCorp Inc."
              },
              {
                content: "The AI-powered insights have been a game-changer for our team. We're now able to accurately forecast our pipeline and focus on the right opportunities at the right time.",
                author: "Michael Rodriguez",
                title: "Sales Director, GrowthWave"
              }
            ].map((testimonial, index) => (
              <div key={index} style={{
                flex: 1,
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
              }}>
                <p style={{
                  fontSize: '1rem',
                  marginBottom: '1.5rem',
                  color: '#64748b',
                }}>
                  "{testimonial.content}"
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    marginRight: '1rem',
                    backgroundColor: '#e2e8f0',
                  }}></div>
                  <div>
                    <h4 style={{
                      fontWeight: 600,
                      marginBottom: '0.25rem',
                    }}>
                      {testimonial.author}
                    </h4>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                    }}>
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
        color: 'white',
        textAlign: 'center',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
          }}>
            Ready to Transform Your Sales Process?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '2rem',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            opacity: 0.9,
          }}>
            Join thousands of sales professionals who have already boosted their performance with SalesTern. Get started with a 14-day free trial today.
          </p>
          <a href="#" style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            borderRadius: '4px',
            fontWeight: 600,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            backgroundColor: 'white',
            color: '#2563eb',
            textDecoration: 'none',
          }}>
            Start Your Free Trial
          </a>
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '4rem 0 2rem',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '3rem',
            marginBottom: '3rem',
          }}>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: 'white',
              }}>
                SalesTern
              </h3>
              <p style={{
                color: '#e2e8f0',
                marginBottom: '1.5rem',
              }}>
                Empowering sales teams with the tools and insights needed to exceed targets and transform their sales process.
              </p>
              <div style={{
                display: 'flex',
                gap: '1rem',
              }}>
                {['📘', '🐦', '📸', '📱'].map((icon, index) => (
                  <a key={index} href="#" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    transition: 'background-color 0.2s',
                    textDecoration: 'none',
                  }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "Roadmap"]
              },
              {
                title: "Resources",
                links: ["Blog", "Guides", "Webinars", "Help Center"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact", "Legal"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                  color: 'white',
                }}>
                  {column.title}
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} style={{
                      marginBottom: '0.75rem',
                    }}>
                      <a href="#" style={{
                        color: '#e2e8f0',
                        transition: 'color 0.2s',
                        textDecoration: 'none',
                      }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            color: '#e2e8f0',
            fontSize: '0.875rem',
          }}>
            <p>&copy; 2025 SalesTern. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SalesTern;