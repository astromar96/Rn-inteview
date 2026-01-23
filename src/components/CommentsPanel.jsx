import { useState } from 'react'
import { MessageSquare, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { useApp } from '../context/AppContext'
import clsx from 'clsx'

export function CommentsPanel({ questionId }) {
  const { getCommentsForQuestion, deleteComment } = useApp()
  const [isExpanded, setIsExpanded] = useState(true)

  const comments = getCommentsForQuestion(questionId)

  if (comments.length === 0) {
    return null
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="mt-6 border-t border-border pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-3"
      >
        <MessageSquare className="w-4 h-4" />
        Your Notes ({comments.length})
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-surface-elevated border border-border rounded-lg p-3 group"
            >
              {/* Selected text */}
              <div className="mb-2 pb-2 border-b border-border/50">
                <p className="text-xs text-text-muted mb-1">Highlighted:</p>
                <p className="text-sm text-primary/80 italic line-clamp-2">
                  "{comment.selectedText}"
                </p>
              </div>

              {/* Comment */}
              <p className="text-sm text-text-primary whitespace-pre-wrap">
                {comment.comment}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                <span className="text-xs text-text-muted">
                  {formatDate(comment.createdAt)}
                </span>
                <button
                  onClick={() => deleteComment(questionId, comment.id)}
                  className="p-1 rounded text-text-muted hover:text-error hover:bg-error/10 opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete comment"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
