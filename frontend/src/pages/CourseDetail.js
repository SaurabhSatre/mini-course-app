import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseAPI, subscriptionAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(null);

  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getById(id);
      setCourse(response.data.course);
      if (response.data.course.price > 0) {
        setDiscountedPrice(response.data.course.price);
      }
    } catch (error) {
      toast.error('Failed to load course details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast.error('Please enter a promo code');
      return;
    }

    if (promoCode.toUpperCase() === 'BFSALE25') {
      if (course.price > 0) {
        const discount = course.price * 0.5;
        setDiscountedPrice(discount);
        setPromoApplied(true);
        toast.success('Promo code applied! 50% discount applied.');
      }
    } else {
      toast.error('Invalid promo code');
      setPromoCode('');
    }
  };

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to subscribe');
      navigate('/login');
      return;
    }

    if (course.price > 0 && !promoApplied) {
      toast.error('Please apply a valid promo code first');
      return;
    }

    setSubscribing(true);
    try {
      const response = await subscriptionAPI.subscribe({
        courseId: id,
        promoCode: course.price > 0 ? promoCode : undefined,
      });

      if (response.data.success) {
        toast.success('Successfully subscribed to the course!');
        navigate('/my-courses');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to subscribe';
      toast.error(message);
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-500"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  const isFree = course.price === 0;
  const finalPrice = isFree ? 0 : (promoApplied ? discountedPrice : course.price);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-indigo-600 hover:text-indigo-500 flex items-center"
        >
          ← Back to Courses
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {course.image && (
            <div className="h-64 md:h-96 w-full overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Course+Image';
                }}
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {course.title}
              </h1>
              <span
                className={`px-4 py-2 rounded-full text-lg font-semibold ${
                  isFree
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {isFree ? 'FREE' : `₹${course.price.toFixed(2)}`}
              </span>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 text-lg leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="border-t pt-6">
              {isFree ? (
                <div>
                  <p className="text-gray-600 mb-4">
                    This is a free course. Click below to subscribe instantly!
                  </p>
                  <button
                    onClick={handleSubscribe}
                    disabled={subscribing}
                    className="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {subscribing ? 'Subscribing...' : 'Subscribe Now (Free)'}
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Subscribe to Course
                  </h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="Enter promo code (BFSALE25)"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={promoApplied}
                      />
                      <button
                        onClick={handleApplyPromo}
                        disabled={promoApplied}
                        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {promoApplied ? 'Applied ✓' : 'Apply Promo'}
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="mt-2 text-sm text-green-600">
                        ✓ Promo code applied! 50% discount active.
                      </p>
                    )}
                  </div>

                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Original Price:</span>
                      <span className="text-gray-900 font-semibold">
                        ₹{course.price.toFixed(2)}
                      </span>
                    </div>
                    {promoApplied && (
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Discount (50%):</span>
                        <span className="text-green-600 font-semibold">
                          -₹{(course.price * 0.5).toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-lg font-semibold text-gray-900">
                        Final Price:
                      </span>
                      <span className="text-2xl font-bold text-indigo-600">
                        ₹{finalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubscribe}
                    disabled={subscribing || !promoApplied}
                    className="w-full px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {subscribing
                      ? 'Processing...'
                      : promoApplied
                      ? `Subscribe for ₹${finalPrice.toFixed(2)}`
                      : 'Apply Promo Code to Subscribe'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

