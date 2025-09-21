export const formatRailsDate = (dateString: string): string => {
  if (!dateString) return '';
  
  // Rails often returns dates in this format: "2025-09-20T16:18:27.162Z"
  // But let's handle various formats
  
  let date: Date;
  
  // Try parsing as ISO string first
  date = new Date(dateString);
  
  // If that fails, try replacing spaces with T (for Rails format without Z)
  if (isNaN(date.getTime())) {
    const isoFormatted = dateString.replace(' ', 'T');
    date = new Date(isoFormatted);
  }
  
  // If still invalid, try adding Z for UTC
  if (isNaN(date.getTime())) {
    const withZ = `${dateString}Z`;
    date = new Date(withZ);
  }
  
  // If still invalid, return empty string
  if (isNaN(date.getTime())) {
    console.warn('Invalid date string:', dateString);
    return '';
  }
  
  // Format the time
  return date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};