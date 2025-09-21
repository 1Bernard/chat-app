'use client';

import { useEffect } from 'react';
import { api } from '../lib/api';

export default function ApiTest() {
  useEffect(() => {
    const testApi = async () => {
      try {
        // Test conversations endpoint
        const convResponse = await api.get('/conversations');
        console.log('Conversations test:', convResponse.data);
        
        // Test messages endpoint if we have a conversation
        if (convResponse.data.data.length > 0) {
          const convId = convResponse.data.data[0].id;
          const msgResponse = await api.get(`/conversations/${convId}/messages`);
          console.log('Messages test:', msgResponse.data);
        }
      } catch (error) {
        console.error('API test failed:', error);
      }
    };
    
    testApi();
  }, []);

  return <div className="hidden">API Test Component</div>;
}