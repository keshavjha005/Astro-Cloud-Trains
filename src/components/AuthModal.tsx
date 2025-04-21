
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, User, KeyRound } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup" | "reset";
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = "login" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, resetPassword, register } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
      onClose();
    } catch (error) {
      // Error handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return; // Error will be shown in the UI
    }
    
    setIsSubmitting(true);
    try {
      await register(email, password, username);
      onClose();
    } catch (error) {
      // Error handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setActiveTab("login");
    } catch (error) {
      // Error handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="cosmic-glass max-w-md w-full p-6 animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-cosmic-light text-glow">
            Cosmic Access Portal
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup" | "reset")} className="w-full mt-4">
          <TabsList className="grid grid-cols-2 w-full bg-cosmic-dark/50">
            <TabsTrigger value="login" className="data-[state=active]:bg-cosmic-accent/20">Login</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-cosmic-accent/20">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4 mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-cosmic-light">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-light/70 h-4 w-4" />
                  <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cosmic.traveler@astral.com"
                    className="pl-10 bg-cosmic-dark/30 border-cosmic-light/30 focus:border-cosmic-accent"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-cosmic-light">Password</Label>
                  <button 
                    type="button" 
                    className="text-cosmic-accent text-xs hover:text-cosmic-light transition-colors"
                    onClick={() => setActiveTab("reset")}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-light/70 h-4 w-4" />
                  <Input 
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 bg-cosmic-dark/30 border-cosmic-light/30 focus:border-cosmic-accent"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-cosmic-accent hover:bg-cosmic text-cosmic-dark font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Connecting to the cosmos..." : "Enter the Cosmos"}
              </Button>
              
              <div className="text-center text-xs text-cosmic-light/70 mt-4">
                Demo credentials: admin@astral.com / admin123
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4 mt-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-username" className="text-cosmic-light">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-light/70 h-4 w-4" />
                  <Input 
                    id="signup-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="StarGazer123"
                    className="pl-10 bg-cosmic-dark/30 border-cosmic-light/30 focus:border-cosmic-accent"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-cosmic-light">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-light/70 h-4 w-4" />
                  <Input 
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.name@astral.com"
                    className="pl-10 bg-cosmic-dark/30 border-cosmic-light/30 focus:border-cosmic-accent"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-cosmic-light">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-light/70 h-4 w-4" />
                  <Input 
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 bg-cosmic-dark/30 border-cosmic-light/30 focus:border-cosmic-accent"
                    required
                    minLength={6}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password" className="text-cosmic-light">Confirm Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-light/70 h-4 w-4" />
                  <Input 
                    id="signup-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 bg-cosmic-dark/30 border-cosmic-light/30 focus:border-cosmic-accent"
                    required
                  />
                </div>
                {password !== confirmPassword && confirmPassword && (
                  <p className="text-destructive text-xs mt-1">Passwords do not align with the cosmic order</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-cosmic-accent hover:bg-cosmic text-cosmic-dark font-semibold"
                disabled={isSubmitting || password !== confirmPassword}
              >
                {isSubmitting ? "Creating your celestial account..." : "Begin Your Cosmic Journey"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="reset" className="space-y-4 mt-4">
            <form onSubmit={handleReset} className="space-y-4">
              <div className="text-center mb-4 text-cosmic-light/80">
                <p>Enter your email address and we'll send you a link to reset your cosmic password.</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-cosmic-light">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-light/70 h-4 w-4" />
                  <Input 
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cosmic.traveler@astral.com"
                    className="pl-10 bg-cosmic-dark/30 border-cosmic-light/30 focus:border-cosmic-accent"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-cosmic-accent hover:bg-cosmic text-cosmic-dark font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Searching the cosmos..." : "Restore Cosmic Access"}
              </Button>
              
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full text-cosmic-light hover:bg-cosmic-dark/30"
                onClick={() => setActiveTab("login")}
              >
                Back to Login
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
