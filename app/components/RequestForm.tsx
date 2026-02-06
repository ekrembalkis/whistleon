'use client'

import { useState, FormEvent } from 'react'

export function RequestForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setStatus('sent')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="request-section" id="request">
      <h2 className="section-title">Send a Request</h2>
      <p className="section-subtitle">Have a video idea or channel request? Let us know!</p>

      <form className="request-form glass liquid-shine" onSubmit={handleSubmit}>
        <div className="request-form-inner">
          <div className="request-field">
            <label htmlFor="req-name" className="request-label">Name</label>
            <input
              id="req-name"
              type="text"
              className="request-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              disabled={status === 'sending'}
            />
          </div>

          <div className="request-field">
            <label htmlFor="req-email" className="request-label">Email</label>
            <input
              id="req-email"
              type="email"
              className="request-input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={254}
              disabled={status === 'sending'}
            />
          </div>

          <div className="request-field">
            <label htmlFor="req-message" className="request-label">Your Request</label>
            <textarea
              id="req-message"
              className="request-input request-textarea"
              placeholder="Describe your video idea, topic suggestion, or any request for the channel..."
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={2000}
              disabled={status === 'sending'}
            />
          </div>

          <button
            type="submit"
            className="request-submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Submit Request'}
          </button>

          {status === 'sent' && (
            <p className="request-status request-success">Thanks! Your request has been sent.</p>
          )}
          {status === 'error' && (
            <p className="request-status request-error">Something went wrong. Please try again.</p>
          )}
        </div>
      </form>
    </section>
  )
}
