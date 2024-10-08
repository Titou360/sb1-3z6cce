'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

const PaymentPage = () => {
  const { availablePlugins, selectedPlugins } = useSelector((state: RootState) => state.plugins);
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = availablePlugins
      .filter(plugin => selectedPlugins.includes(plugin.id))
      .reduce((sum, plugin) => sum + plugin.price, 0);
    setTotalPrice(total);
  }, [availablePlugins, selectedPlugins]);

  const handlePayment = () => {
    // Here you would typically integrate with Stripe or another payment processor
    console.log('Processing payment...');
    // For demo purposes, we'll just redirect to a success page
    router.push('/payment/success');
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Payment Summary</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Selected Plugins</CardTitle>
            <CardDescription>Annual subscription</CardDescription>
          </CardHeader>
          <CardContent>
            {availablePlugins
              .filter(plugin => selectedPlugins.includes(plugin.id))
              .map(plugin => (
                <div key={plugin.id} className="flex justify-between mb-2">
                  <span>{plugin.name}</span>
                  <span>${plugin.price}/month</span>
                </div>
              ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total Annual Cost:</span>
                <span>${totalPrice * 12}/year</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button onClick={handlePayment} className="w-full">
          Pay ${totalPrice * 12} for Annual Subscription
        </Button>
      </div>
    </AuthenticatedLayout>
  );
};

export default PaymentPage;