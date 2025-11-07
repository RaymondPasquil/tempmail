'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RefreshCw, Clock, Mail, Inbox, ExternalLink, X, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import Link from 'next/link';

interface TempAccount {
  address: string;
  password: string;
  expiresAt: Date;
  token?: string;
  accountId?: string;
}

interface Message {
  id: string;
  from: {
    address: string;
    name: string;
  };
  subject: string;
  intro: string;
  date: string;
  seen: boolean;
  fullContent?: string;
}

export default function TempEmailService() {
  const [account, setAccount] = useState<TempAccount | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(600); // 10 minutes
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isExtending, setIsExtending] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isMessageLoading, setIsMessageLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // --- Generate temporary email on mount ---
  useEffect(() => {
    generateTempEmail();
  }, []);

  // --- Countdown timer ---
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleExpiration();
      return;
    }
    const timer = setInterval(() => setTimeRemaining(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeRemaining]);

  // --- Poll for new messages every 5 seconds ---
  useEffect(() => {
    if (!account) return;
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [account]);

  // --- Inject third-party script for ad ---
// ✅ --- Safe third-party ad injection ---
// ✅ Sandboxed banner ad (prevents top-level redirects)
// Safe-but-permissive sandboxed banner ad
// Adsterra sandboxed banner (prevents top-level redirects)
useEffect(() => {
  const timer = setTimeout(() => {
    try {
      const host = document.getElementById('banner-ad-box');
      if (!host) return;

      // Create a sandboxed iframe that the ad will live inside
      const iframe = document.createElement('iframe');
      iframe.title = 'Adsterra Banner';
      iframe.width = '160';
      iframe.height = '300';
      iframe.frameBorder = '0';
      iframe.scrolling = 'no';
      iframe.referrerPolicy = 'no-referrer';
      // Allow scripts + same-origin; permit top navigation only by user click
      iframe.setAttribute(
        'sandbox',
        'allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation'
      );

      host.innerHTML = ''; // remove "Loading Ad..."
      host.appendChild(iframe);

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

      // Write a minimal HTML page into the iframe and load the Adsterra invoke.js there
      doc.open();
      doc.write(`<!doctype html>
<html>
  <head><meta charset="utf-8" /></head>
  <body style="margin:0;padding:0;overflow:hidden;width:160px;height:300px;">
    <div id="ad-slot" style="width:160px;height:300px;"></div>
    <script>
      // Adsterra options must exist BEFORE invoke.js
      window.atOptions = {
        key: 'c0dde8f95414a6ee4c64549b85d55051',
        format: 'iframe',
        height: 300,
        width: 160,
        params: {}
      };
    </script>
    <script src="https://www.highperformanceformat.com/c0dde8f95414a6ee4c64549b85d55051/invoke.js" async></script>
  </body>
</html>`);
      doc.close();

      // Fallback if blocked/no-fill after 6s
      setTimeout(() => {
        try {
          const idoc = iframe.contentDocument || iframe.contentWindow?.document;
          const filled = idoc && idoc.body && idoc.body.querySelector('iframe, ins, a, img');
          if (!filled) {
            host.innerHTML =
              '<div style="width:160px;height:300px;display:flex;align-items:center;justify-content:center;border:1px dashed #ccc;border-radius:8px;color:#888;font:12px system-ui">Ad blocked or unavailable</div>';
          }
        } catch {}
      }, 6000);
    } catch (err) {
      console.error('Adsterra banner failed to load:', err);
    }
  }, 1200); // small delay to let hydration finish

  return () => clearTimeout(timer);
}, []);



  // --- Helper functions ---
  const generateTempEmail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/temp-email/create', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const data = await response.json();
      if (data.success) {
        setAccount({
          address: data.address,
          password: data.password,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
          token: data.token,
          accountId: data.accountId
        });
        setTimeRemaining(600);
        toast.success('Temporary email generated successfully!');
      } else {
        toast.error('Failed to generate temporary email: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      toast.error('Error generating temporary email: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!account) return;
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/temp-email/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: account.address, password: account.password }),
      });
      const data = await response.json();
      if (data.success) setMessages(data.messages || []);
    } catch {
      toast.error('Failed to refresh messages');
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchMessage = async (messageId: string) => {
    if (!account) return;
    setIsMessageLoading(true);
    try {
      const response = await fetch(`/api/temp-email/message/${messageId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: account.address, password: account.password }),
      });
      const data = await response.json();
      if (data.success) {
        const fullMessage = {
          ...data.message,
          id: data.message.id,
          from: { address: data.message.from.address, name: data.message.from.name || data.message.from.address },
          subject: data.message.subject,
          intro: data.message.intro || data.message.text?.substring(0, 150) + '...' || 'No preview available',
          date: data.message.createdAt,
          seen: data.message.seen || false,
          fullContent: data.message.text || data.message.html || 'No content available',
        };
        setSelectedMessage(fullMessage);
        setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, seen: true } : msg));
      } else {
        toast.error('Failed to fetch message');
      }
    } catch {
      toast.error('Error fetching message');
    } finally {
      setIsMessageLoading(false);
    }
  };

  const extendTimer = () => {
    setIsExtending(true);
    setTimeout(() => {
      setTimeRemaining(prev => prev + 300);
      setIsExtending(false);
      toast.success('Timer extended by 5 minutes!');
    }, 500);
  };

  const handleExpiration = () => {
    toast.error('Your temporary email has expired!');
    setTimeout(generateTempEmail, 2000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleString();

  if (isLoading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Generating your temporary email...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-2">Temp Mail</h1>
          <p className="text-muted-foreground">Free, anonymous, temporary email address</p>
        </div>

        {/* Email Display */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Your Temporary Email Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <div className="font-mono text-lg bg-muted p-3 rounded-lg text-center break-all">{account?.address || 'No email generated'}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={generateTempEmail} disabled={isLoading} className="flex items-center gap-2">
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> New
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timer */}
        <Card>
          <CardContent className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">Time Remaining:</span>
              <Badge variant={timeRemaining < 60 ? 'destructive' : 'secondary'} className="text-lg px-3 py-1">{formatTime(timeRemaining)}</Badge>
            </div>
            <Button variant="outline" onClick={extendTimer} disabled={isExtending} className="flex items-center gap-2">
              <RefreshCw className={`h-4 w-4 ${isExtending ? 'animate-spin' : ''}`} /> Extend 5 min
            </Button>
          </CardContent>
        </Card>

        {/* Messages Inbox */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Inbox className="h-5 w-5" /> Inbox ({messages.length})
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipContent><p>Check for new messages</p></TooltipContent>
                  <Button variant="outline" size="sm" onClick={fetchMessages} disabled={!account || isLoading || isRefreshing} className="flex items-center gap-2 border-orange hover:bg-orange hover:text-white">
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} /> {isRefreshing ? 'Refreshing...' : 'Refresh'}
                  </Button>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No messages yet</p>
                <p className="text-sm">Messages will appear here automatically</p>
              </div>
            ) : (
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <Card key={message.id} className={`transition-colors cursor-pointer hover:bg-muted/30 ${!message.seen ? 'bg-muted/50' : ''}`} onClick={() => fetchMessage(message.id)}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{message.from.name || message.from.address}</span>
                              {!message.seen && <Badge variant="secondary" className="text-xs">New</Badge>}
                            </div>
                            <h3 className="font-semibold mb-1">{message.subject}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{message.intro}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2 ml-4">
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(message.date)}</span>
                            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); fetchMessage(message.id); }}>
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* --- Integrated Ad Container --- */}
  {/* Adsterra Banner Box (160×300) */}
<div className="flex justify-center mt-8">
  <div
    id="banner-ad-box"
    className="border rounded-lg shadow-md p-4 bg-muted flex items-center justify-center"
    style={{ width: '160px', height: '300px' }}
  >
    <p className="text-sm text-muted-foreground">Loading Ad...</p>
  </div>
</div>

        {/* Footer */}
        <div className="text-center py-8 text-sm text-muted-foreground space-y-2">
          <p>No registration required • Messages auto-delete after expiration</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/policy">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Shield className="h-4 w-4" /> Privacy Policy & Terms
              </Button>
            </Link>
          </div>
        </div>

        {/* Message Viewer Dialog */}
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-semibold">{selectedMessage?.subject}</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedMessage(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            {isMessageLoading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
            ) : selectedMessage ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground border-b pb-2">
                  <div><span className="font-medium">From: </span>{selectedMessage.from.name} &lt;{selectedMessage.from.address}&gt;</div>
                  <div>{formatDate(selectedMessage.date)}</div>
                </div>

                <ScrollArea className="max-h-96">
                  <div className="prose prose-sm max-w-none">
                    {selectedMessage.fullContent?.split('\n').map((p, idx) => <p key={idx} className="mb-2">{p}</p>)}
                  </div>
                </ScrollArea>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={() => setSelectedMessage(null)} className="flex items-center gap-2 border-orange hover:bg-orange hover:text-white">
                    <X className="h-4 w-4" /> Close
                  </Button>
                </div>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
