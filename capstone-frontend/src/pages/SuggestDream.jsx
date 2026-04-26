import React, { useState } from 'react';
import '../styles/suggestDream.css';

const SuggestDream = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className='suggest-page'>
      <div className='suggest-container'>

        {submitted ? (
          <div className='suggest-success'>
            <h2>Your dream has been received </h2>
            <p>Thank you for sharing your wish with us. We will review it and may add it to our store soon.</p>
          </div>
        ) : (
          <div>
            <h1 className='suggest-title'>Suggest a Dream</h1>
            <p className='suggest-subtitle'>
              Don't see what your heart desires? Tell us your dream and we'll do our best to make it available for everyone.
            </p>

            <form
              action="https://formsubmit.co/nfshaikh@outlook.com"
              method="POST"
              className='suggest-form'
              onSubmit={() => setSubmitted(true)}
            >
              {/* FormSubmit config — hidden fields */}
              <input type="hidden" name="_subject" value="New Dream Suggestion — Dream Store" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              {/* Name (optional) */}
              <div className='suggest-field'>
                <label htmlFor="name">Your Name <span className='optional'>(optional)</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="What should we call you?"
                />
              </div>

              {/* Dream Title */}
              <div className='suggest-field'>
                <label htmlFor="title">Dream Title <span className='required'>*</span></label>
                <input
                  type="text"
                  id="title"
                  name="dream_title"
                  placeholder="Give your dream a name..."
                  required
                />
              </div>

              {/* Description */}
              <div className='suggest-field'>
                <label htmlFor="description">
                  Description <span className='required'>*</span>
                  <span className='char-note'> — max 500 characters</span>
                </label>
                <textarea
                  id="description"
                  name="dream_description"
                  placeholder="Describe your dream in detail. What does it mean to you? What would it bring to your life?"
                  maxLength={500}
                  rows={6}
                  required
                />
              </div>

              <button type="submit" className='suggest-btn'>
                Send My Dream Reguest
              </button>
            </form>
          </div>
        )}

      </div>
    </main>
  );
};

export default SuggestDream;