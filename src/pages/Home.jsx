import { Link, useParams } from 'react-router-dom';
import {
  ChartBarIcon,
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  StarIcon,
  ShieldCheckIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const { userId } = useParams();
  const features = [
    {
      name: 'Earn Commissions',
      description: 'Get paid for every purchase made through your network with our competitive commission structure.',
      icon: CurrencyDollarIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Build Your Team',
      description: 'Grow your downline and increase your earning potential with our proven MLM system.',
      icon: UsersIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Quality Products',
      description: 'Offer premium products that people love to buy, ensuring customer satisfaction and repeat sales.',
      icon: ShoppingBagIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Track Performance',
      description: 'Real-time analytics and insights to monitor your network growth and optimize your strategy.',
      icon: ChartBarIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const stats = [
    { label: 'Active Members', value: '50,000+', change: '+12%', positive: true },
    { label: 'Products Sold', value: '2.5M+', change: '+8%', positive: true },
    { label: 'Total Commissions', value: '$15M+', change: '+15%', positive: true },
    { label: 'Countries', value: '25+', change: '+3', positive: true },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Diamond Member',
      content: 'ShopSmart has transformed my life. I\'ve built a successful network and earned over $50,000 in commissions.',
      avatar: 'SJ',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Platinum Member',
      content: 'The quality of products and the support system here is unmatched. Highly recommended!',
      avatar: 'MC',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Gold Member',
      content: 'Started 6 months ago and already seeing amazing results. The training resources are excellent.',
      avatar: 'ER',
      rating: 5,
    },
  ];

  const benefits = [
    {
      title: 'Flexible Work Schedule',
      description: 'Work from anywhere, anytime. Build your business around your lifestyle.',
      icon: ClockIcon,
    },
    {
      title: 'Comprehensive Training',
      description: 'Access to extensive training materials, webinars, and mentorship programs.',
      icon: AcademicCapIcon,
    },
    {
      title: 'Advanced Technology',
      description: 'State-of-the-art platform with mobile apps and real-time tracking.',
      icon: DevicePhoneMobileIcon,
    },
    {
      title: 'Global Network',
      description: 'Connect with members worldwide and expand your reach internationally.',
      icon: GlobeAltIcon,
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-secondary-900 text-white overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-600/20 to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container-responsive relative z-10 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              Shop <span className="text-primary-400">Smart,</span><br />
              Earn <span className="text-gradient-primary">Smarter</span>
            </h1>
            <p className="text-xl text-secondary-300 mb-10 leading-relaxed max-w-2xl">
              Experience the next generation of e-commerce. Discover premium products through our hybrid platform and unlock unlimited potential within our professional networking ecosystem.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link
                to={userId ? `/ user / ${userId} /shop` : "/shop"}
                className="btn btn-primary btn-lg px-10 py-4 text-lg shadow-xl shadow-primary-500/20 hover:-translate-y-1 transition-all"
              >
                Explore Products
                < ShoppingBagIcon className="ml-3 h-5 w-5" />
              </Link >
            </div >
          </div >
        </div >
      </section >

      {/* Stats Section with Glassmorphism */}
      < section className="relative z-20 -mt-10 mb-20 px-4" >
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl lg:text-4xl font-black text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-secondary-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Features Section */}
      < section className="py-24 bg-secondary-50" >
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-secondary-900 mb-6">
              Why Choose ShopSmart?
            </h2>
            <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              Our unique platform combines premium e-commerce quality with strategic networking opportunities,
              creating a sophisticated ecosystem for modern growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={feature.name} className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-xl transition-all border border-secondary-100 group">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.bgColor} group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {feature.name}
                </h3>
                <p className="text-secondary-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Benefits Section - Refined */}
      < section className="py-24 bg-white" >
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
              <h2 className="text-4xl lg:text-5xl font-black text-secondary-900 mb-8 leading-tight relative">
                Premium Standards <br />
                <span className="text-primary-600">Global Reach</span>
              </h2>
              <p className="text-lg text-secondary-600 mb-10 leading-relaxed">
                Join a community of thousands who have elevated their lifestyle and professional network through our platform.
                Our system is built on trust, quality, and mutual success.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={benefit.title} className="flex flex-col space-y-3">
                    <div className="w-10 h-10 bg-secondary-900 text-white rounded-lg flex items-center justify-center shadow-lg">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary-900">
                      {benefit.title}
                    </h3>
                    <p className="text-secondary-500 text-sm leading-snug">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-10">
              <div className="bg-secondary-900 rounded-3xl p-10 lg:p-14 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary-500/30 transition-all"></div>
                <h3 className="text-3xl font-bold mb-6">Our Commitment</h3>
                <p className="text-secondary-400 mb-10 text-lg leading-relaxed border-l-4 border-primary-500 pl-6">
                  "Ensuring every interaction on our platform meets the highest standards of quality and transparency."
                </p>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <ShieldCheckIcon className="h-4 w-4 text-primary-400" />
                    </div>
                    <span className="text-secondary-300 font-medium tracking-wide">SECURE & TRANSPARENT SYSTEM</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <RocketLaunchIcon className="h-4 w-4 text-primary-400" />
                    </div>
                    <span className="text-secondary-300 font-medium tracking-wide">SCALABLE OPPORTUNITIES</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <UsersIcon className="h-4 w-4 text-primary-400" />
                    </div>
                    <span className="text-secondary-300 font-medium tracking-wide">DEDICATED SUPPORT SYSTEM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Testimonials Section */}
      < section className="py-24 bg-secondary-900 text-white" >
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-secondary-400 max-w-3xl mx-auto italic leading-relaxed">
              "Excellence is not a skill, it is an attitude."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.name} className="bg-secondary-800/50 backdrop-blur p-10 rounded-3xl border border-secondary-700 hover:border-primary-500/50 transition-all group">
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-500/20 uppercase">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-5">
                    <h4 className="font-bold text-lg text-white group-hover:text-primary-400 transition-colors uppercase tracking-tight">{testimonial.name}</h4>
                    <p className="text-sm font-bold text-primary-500 tracking-widest uppercase">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-primary-400 fill-current" />
                  ))}
                </div>
                <p className="text-secondary-400 text-lg italic leading-relaxed font-medium">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section >
    </div >
  );
};

// Placeholder icons for benefits section
const ClockIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AcademicCapIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const DevicePhoneMobileIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const GlobeAltIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0-9c-5 0-9 4-9 9s4 9 9 9" />
  </svg>
);

export default Home;