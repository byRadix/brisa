import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video,
  Archive,
  Star,
  Clock,
  CheckCheck,
  Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  read: boolean;
  type: 'text' | 'image' | 'file';
  attachment_url?: string;
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
  };
  last_message: Message;
  unread_count: number;
  created_at: string;
}

interface MessageStats {
  avgResponseTime: number;
  messageVolume: number;
  engagementRate: number;
  totalConversations: number;
}

const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<MessageStats>({
    avgResponseTime: 0,
    messageVolume: 0,
    engagementRate: 0,
    totalConversations: 0
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockConversations: Conversation[] = [
      {
        id: '1',
        participant: {
          id: '1',
          name: 'María García',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
          online: true
        },
        last_message: {
          id: '1',
          content: 'Hola, me interesa tu servicio de diseño gráfico. ¿Podrías enviarme más información?',
          sender_id: '1',
          receiver_id: user?.id || '',
          created_at: new Date().toISOString(),
          read: false,
          type: 'text'
        },
        unread_count: 2,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        participant: {
          id: '2',
          name: 'Carlos Ruiz',
          avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
          online: false
        },
        last_message: {
          id: '2',
          content: 'Perfecto, quedamos entonces para mañana a las 3 PM.',
          sender_id: user?.id || '',
          receiver_id: '2',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          read: true,
          type: 'text'
        },
        unread_count: 0,
        created_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        participant: {
          id: '3',
          name: 'Ana Martínez',
          avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150',
          online: true
        },
        last_message: {
          id: '3',
          content: '¿Cuánto tiempo necesitas para completar el proyecto?',
          sender_id: '3',
          receiver_id: user?.id || '',
          created_at: new Date(Date.now() - 7200000).toISOString(),
          read: false,
          type: 'text'
        },
        unread_count: 1,
        created_at: new Date(Date.now() - 172800000).toISOString()
      }
    ];

    setConversations(mockConversations);
    setStats({
      avgResponseTime: 2.5,
      messageVolume: 45,
      engagementRate: 85,
      totalConversations: mockConversations.length
    });
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      // Mock messages for the selected conversation
      const mockMessages: Message[] = [
        {
          id: '1',
          content: 'Hola, me interesa tu servicio de diseño gráfico.',
          sender_id: selectedConversation.participant.id,
          receiver_id: user?.id || '',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          read: true,
          type: 'text'
        },
        {
          id: '2',
          content: '¡Hola! Gracias por tu interés. Te puedo ayudar con diseño de logotipos, branding, y material promocional.',
          sender_id: user?.id || '',
          receiver_id: selectedConversation.participant.id,
          created_at: new Date(Date.now() - 3000000).toISOString(),
          read: true,
          type: 'text'
        },
        {
          id: '3',
          content: '¿Podrías enviarme más información sobre tus tarifas?',
          sender_id: selectedConversation.participant.id,
          receiver_id: user?.id || '',
          created_at: new Date().toISOString(),
          read: false,
          type: 'text'
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedConversation, user]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender_id: user?.id || '',
      receiver_id: selectedConversation.participant.id,
      created_at: new Date().toISOString(),
      read: false,
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Hace unos minutos';
    } else if (diffInHours < 24) {
      return `Hace ${Math.floor(diffInHours)} horas`;
    } else {
      return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mensajes</h1>
        <p className="text-gray-600">Gestiona tus conversaciones con clientes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversaciones</p>
              <h3 className="text-xl font-bold text-gray-800">{stats.totalConversations}</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tiempo de Respuesta</p>
              <h3 className="text-xl font-bold text-gray-800">{stats.avgResponseTime}h</h3>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Mensajes este mes</p>
              <h3 className="text-xl font-bold text-gray-800">{stats.messageVolume}</h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <Send className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tasa de Respuesta</p>
              <h3 className="text-xl font-bold text-gray-800">{stats.engagementRate}%</h3>
            </div>
            <div className="p-2 bg-orange-100 rounded-full">
              <Star className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Messages Interface */}
      <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <Input
              placeholder="Buscar conversaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search size={18} />}
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.participant.avatar}
                      alt={conversation.participant.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.participant.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {conversation.participant.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatTime(conversation.last_message.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.last_message.content}
                    </p>
                    {conversation.unread_count > 0 && (
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {conversation.unread_count} nuevos
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedConversation.participant.avatar}
                    alt={selectedConversation.participant.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {selectedConversation.participant.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedConversation.participant.online ? 'En línea' : 'Desconectado'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Phone size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Video size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender_id === user?.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender_id === user?.id ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {new Date(message.created_at).toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Paperclip size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <ImageIcon size={20} />
                  </button>
                  <div className="flex-1">
                    <Input
                      placeholder="Escribe un mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Selecciona una conversación
                </h3>
                <p className="text-gray-500">
                  Elige una conversación de la lista para comenzar a chatear
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;