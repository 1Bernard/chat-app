import { AnyMessage } from '../types';
import { formatRailsDate } from '../utils/date';

interface MessageBubbleProps {
  message: AnyMessage;
  isOptimistic?: boolean;
}

export default function MessageBubble({ message, isOptimistic = false }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const timestamp = formatRailsDate(message.created_at);

  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[75%]">
        <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            isUser ? 'bg-purple-600' : 'bg-gray-600'
          } text-white`}>
            <i className={`fas ${isUser ? 'fa-user' : 'fa-robot'} text-sm`}></i>
          </div>
          <div className={`px-4 py-2 rounded-2xl ${
            isUser 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-800'
          } ${isOptimistic ? 'opacity-70' : ''}`}>
            <div className="flex items-center gap-2">
              <span>{message.content}</span>
              {isOptimistic && (
                <i className="fas fa-circle-notch fa-spin text-xs"></i>
              )}
            </div>
          </div>
        </div>
        {timestamp && (
          <div className={`text-xs text-gray-500 mt-1 ${
            isUser ? 'text-right mr-10' : 'ml-10'
          }`}>
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
}