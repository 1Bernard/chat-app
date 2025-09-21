import { Message } from '../types';
import { formatRailsDate } from '../utils/date';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const timestamp = formatRailsDate(message.created_at);

  // Debug: log the message content
  console.log('Message data:', message);

  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[75%]">
        <div className={`flex items-end space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-purple-600' : 'bg-gray-600'} text-white`}>
            {isUser ? (
              <i className="fas fa-user text-sm"></i>
            ) : (
              <i className="fas fa-robot text-sm"></i>
            )}
          </div>
          <div className={`${isUser ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'} px-4 py-2 rounded-2xl`}>
            {/* Add a fallback in case content is empty */}
            {message.content || '(Empty message)'}
          </div>
        </div>
        {timestamp && (
          <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right mr-10' : 'ml-10'}`}>
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
}