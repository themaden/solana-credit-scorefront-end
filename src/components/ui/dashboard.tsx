'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Wallet, Zap, Lock, TrendingUp, AlertCircle, Star, ArrowUp, ArrowDown, Shield, Gem, CreditCard, Bell } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Toast } from "@/components/ui/toast"

export default function AdvancedCreditDashboard() {
  const [creditScore, setCreditScore] = useState(75)
  const [transactions, setTransactions] = useState({
    total: 142,
    volume: 2450,
    averageSize: 17.25
  })
  const [creditHistory, setCreditHistory] = useState([
    { date: '2023-01', score: 65 },
    { date: '2023-02', score: 68 },
    { date: '2023-03', score: 72 },
    { date: '2023-04', score: 75 },
  ])
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your credit score has improved!", type: "success" },
    { id: 2, message: "New DeFi opportunity available", type: "info" },
  ])

  // Kredi puanı renk ve durum belirleme fonksiyonları
  const getCreditScoreDetails = () => {
    if (creditScore < 50) return {
      color: 'text-red-500 border-red-500',
      status: 'Düşük Risk',
      description: 'Kredi puanınız kritik seviyede. Hemen eylem almalısınız.',
      recommendation: 'Acil İyileştirme Gerekli'
    }
    if (creditScore < 70) return {
      color: 'text-yellow-500 border-yellow-500',
      status: 'Orta Risk',
      description: 'Kredi puanınız geliştirmeye açık. Küçük adımlarla ilerleyebilirsiniz.',
      recommendation: 'Gelişim Fırsatları Var'
    }
    if (creditScore < 85) return {
      color: 'text-blue-500 border-blue-500',
      status: 'İyi Seviye',
      description: 'Kredi puanınız iyi durumda. Devam eden performansınızı koruyun.',
      recommendation: 'Sürdürülebilir Performans'
    }
    return {
      color: 'text-green-500 border-green-500',
      status: 'Mükemmel',
      description: 'Kredi puanınız üst düzey. Finansal hedeflerinize yakınsınız.',
      recommendation: 'Üstün Performans'
    }
  }

  const scoreDetails = getCreditScoreDetails()

  // Yeni fonksiyon: Bildirimleri gizle
  const handleNotificationDismiss = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-900 tracking-tight">
          🚀 Solana Kredi Puanlama Platformu
        </h1>
        
        {/* Bildirimler */}
        <div className="mb-6">
          {notifications.map((notification) => (
            <Toast
              key={notification.id}
              variant={notification.type === "success" ? "default" : "destructive"}
              title={notification.type === "success" ? "Başarı" : "Bilgi"}
              description={notification.message}
              onDismiss={() => handleNotificationDismiss(notification.id)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kredi Puanı Kartı */}
          <Card className="shadow-2xl border-2 border-blue-100 hover:border-blue-300 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl text-blue-800">
                <Shield className="w-6 h-6 mr-2 text-blue-600" />
                Kredi Puanı Profili
              </CardTitle>
              <CardDescription className="text-blue-600">
                Finansal İtibarınızın Dijital Göstergesi
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-52 h-52 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    className="text-gray-200 stroke-current" 
                    strokeWidth="10" 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent"
                  ></circle>
                  <circle 
                    className={`${scoreDetails.color} stroke-current`}
                    strokeWidth="10" 
                    strokeLinecap="round" 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent"
                    strokeDasharray={`${creditScore * 2.51327}, 251.327`}
                    transform="rotate(-90 50 50)"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-bold ${scoreDetails.color}`}>
                    {creditScore}
                  </span>
                  <span className="text-sm text-gray-600 mt-1">
                    {scoreDetails.status}
                  </span>
                </div>
              </div>
              <p className="text-center text-sm text-blue-700 px-4">
                {scoreDetails.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Badge 
                variant="outline" 
                className={`${scoreDetails.color} border-2 font-bold`}
              >
                {scoreDetails.recommendation}
              </Badge>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700"
                  onClick={() => setCreditScore(Math.min(creditScore + 5, 100))}
                >
                  <ArrowUp className="w-4 h-4 mr-1" /> Artır
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-red-50 hover:bg-red-100 text-red-700"
                  onClick={() => setCreditScore(Math.max(creditScore - 5, 0))}
                >
                  <ArrowDown className="w-4 h-4 mr-1" /> Azalt
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* İşlem Analizi Kartı */}
          <Card className="shadow-2xl border-2 border-green-100 hover:border-green-300 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl text-green-800">
                <CreditCard className="w-6 h-6 mr-2 text-green-600" />
                İşlem Performans Raporu
              </CardTitle>
              <CardDescription className="text-green-600">
                30 Günlük Finansal Aktivite Özeti
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[ 
                  { 
                    label: "Toplam İşlem Sayısı", 
                    value: transactions.total, 
                    icon: <BarChart className="w-5 h-5 text-blue-500" />,
                    bgColor: "bg-blue-50"
                  },
                  { 
                    label: "Toplam İşlem Hacmi", 
                    value: `${transactions.volume} SOL`, 
                    icon: <Zap className="w-5 h-5 text-green-500" />,
                    bgColor: "bg-green-50"
                  },
                  { 
                    label: "Ortalama İşlem Büyüklüğü", 
                    value: `${transactions.averageSize} SOL`, 
                    icon: <Gem className="w-5 h-5 text-purple-500" />,
                    bgColor: "bg-purple-50"
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex justify-between items-center p-3 rounded-lg ${item.bgColor} hover:brightness-95 transition-all`}
                  >
                    <div className="flex items-center space-x-2">
                      {item.icon}
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                    <Badge variant="secondary" className="font-bold">
                      {item.value}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kredi Puanı Tarihi Grafiği */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-blue-800">Kredi Puanı Geçmişi</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={creditHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
