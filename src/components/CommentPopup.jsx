import { useState, useRef, useEffect } from 'react'
import { MessageSquarePlus, X, Send } from 'lucide-react'
import clsx from 'clsx'

export function CommentPopup({ position, selectedText, onSubmit, onClose }) {
  const [comment, setComment] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef(null)
  const popupRef = useRef(null)

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      onSubmit(comment.trim())
      setComment('')
      onClose()
    }
  }

  // Calculate position to keep popup in view
  const style = {
    position: 'fixed',
    left: Math.min(position.x, window.innerWidth - 320),
    top: Math.min(position.y + 10, window.innerHeight - 200),
    zIndex: 100,
  }

  if (!isExpanded) {
    return (
      <div ref={popupRef} style={style}>
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-3 py-2 bg-primary text-background rounded-lg shadow-lg hover:bg-primary-dark transition-colors text-sm font-medium"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Add Comment
        </button>
      </div>
    )
  }

  return (
    <div
      ref={popupRef}
      style={style}
      className="w-80 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-surface-elevated flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary">Add Comment</span>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-surface text-text-muted hover:text-text-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Selected text preview */}
      <div className="px-4 py-2 bg-primary/10 border-b border-border">
        <p className="text-xs text-text-muted mb-1">Selected text:</p>
        <p className="text-sm text-text-secondary line-clamp-2 italic">
          "{selectedText.substring(0, 100)}{selectedText.length > 100 ? '...' : ''}"
        </p>
      </div>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="p-4">
        <textarea
          ref={inputRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment or note..."
          className="w-full px-3 py-2 bg-surface-elevated border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          rows={3}
        />
        <div className="flex justify-end gap-2 mt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!comment.trim()}
            className={clsx(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              comment.trim()
                ? "bg-primary text-background hover:bg-primary-dark"
                : "bg-surface-elevated text-text-muted cursor-not-allowed"
            )}
          >
            <Send className="w-3.5 h-3.5" />
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
