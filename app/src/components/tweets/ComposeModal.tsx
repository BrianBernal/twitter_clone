import { useState } from 'react';
import { useCreateTweet } from '../../hooks/useTweets';

interface ComposeModalProps {
  open: boolean;
  onClose: () => void;
}

const MAX_CHARS = 280;

function ComposeModal({ open, onClose }: ComposeModalProps) {
  const [text, setText] = useState('');
  const createTweet = useCreateTweet();
  const remaining = MAX_CHARS - text.length;
  const isOverLimit = remaining < 0;
  const isNearLimit = remaining < 20 && remaining >= 0;

  const handleSubmit = () => {
    if (!text.trim() || isOverLimit) return;
    createTweet.mutate(text.trim(), {
      onSuccess: () => {
        setText('');
        onClose();
      },
    });
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-surface rounded-2xl w-full max-w-lg border border-border"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-text-primary font-bold text-lg">New Chirp</h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary transition-colors p-1"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
              maxLength={MAX_CHARS + 50}
              className="w-full bg-transparent text-text-primary text-lg resize-none outline-none placeholder-text-secondary min-h-[120px]"
              autoFocus
            />

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-mono ${
                    isOverLimit
                      ? 'text-secondary'
                      : isNearLimit
                        ? 'text-accent'
                        : 'text-text-secondary'
                  }`}
                >
                  {remaining}
                </span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!text.trim() || isOverLimit || createTweet.isPending}
                className="bg-primary text-white font-bold px-6 py-2 rounded-full hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {createTweet.isPending ? 'Chirping...' : 'Chirp'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ComposeModal;
