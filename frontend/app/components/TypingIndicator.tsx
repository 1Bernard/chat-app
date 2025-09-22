export default function TypingIndicator() {
  return (
    <div className="flex items-start space-x-2 mb-4">
      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
        <i className="fas fa-robot"></i>
      </div>
      <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}