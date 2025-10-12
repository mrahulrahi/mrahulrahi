'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const MessageForm = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setMessage(result.message || 'Thanks for your message!');
      setShowMessage(true);
      reset();
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
      setShowMessage(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        setMessage('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-group d-flex flex-column gap-2">
        <div className="row g-2">
          <div className="col-md-5">
            <input
              type="text"
              placeholder="Enter your full name here*"
              required
              className="form-control mb-2"
              {...register('name')}
              disabled={isSubmitting}
            />
            <input
              type="email"
              placeholder="Enter your email here*"
              required
              className="form-control mb-2"
              {...register('email')}
              disabled={isSubmitting}
            />
            <input
              type="text"
              placeholder="Enter your subject here*"
              required
              className="form-control"
              {...register('subject')}
              disabled={isSubmitting}
            />
          </div>
          <div className="col-md-7">
            <textarea
              className="form-control"
              placeholder="Enter your message here*"
              required
              rows={6}
              {...register('message')}
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="d-flex">
          {showMessage && <p className="mt-1 text-accent" role="alert">{message}</p>}
          <div className="ms-auto">
            <button type="submit" className="btn btn-gradient" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Message Me'}
            </button>
          </div>
        </div>
      </form>

    </>
  );
};

export default MessageForm;
