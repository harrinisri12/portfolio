import { useState } from 'react';
import { supabase } from '../lib/supabase';

export const useFeedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: 'General Feedback',
    rating: 5,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Rating validation
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5 stars';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating
    }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: null }));
    }
  };

  const submitFeedback = async (e) => {
    if (e) e.preventDefault();
    
    setSubmitStatus(null);
    if (!validate()) return false;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            feedback_type: formData.feedbackType,
            rating: parseInt(formData.rating, 10),
            message: formData.message.trim()
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      // Reset form (except feedbackType and rating defaults)
      setFormData({
        name: '',
        email: '',
        feedbackType: 'General Feedback',
        rating: 5,
        message: ''
      });
      return true;
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setSubmitStatus('error');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleInputChange,
    handleRatingChange,
    submitFeedback,
    setSubmitStatus
  };
};
