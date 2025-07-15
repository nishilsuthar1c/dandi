"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitPullRequest, TrendingUp, FileText, Zap, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isSignedIn = !!session;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 lg:px-8 h-16 flex items-center border-b bg-white/80 backdrop-blur z-10 sticky top-0">
        <Link className="flex items-center justify-center" href="#">
          <Github className="h-7 w-7 mr-2" />
          <span className="font-bold text-2xl tracking-tight">Dandi</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-6">
          <Link className="text-base font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-base font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
          <Link className="text-base font-medium hover:underline underline-offset-4" href="#about">
            About
          </Link>
        </nav>
        <div className="ml-4 flex gap-2 items-center">
          {isLoading ? null : isSignedIn ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => (window.location.href = "/dashboards")}
              >
                Dashboard
              </Button>
              <span className="text-sm font-medium px-2">{session.user?.name || session.user?.email}</span>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>Sign Out</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => signIn()}>Login</Button>
              <Button size="sm" onClick={() => signIn()}>Sign Up</Button>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center py-16 md:py-32 bg-background">
          <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center px-4 md:px-0">
            <Badge variant="secondary" className="mb-6 flex items-center mx-auto">
              <Zap className="w-4 h-4 mr-1" />
              AI-Powered GitHub Analysis
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
              Unlock Deep Insights from Any <span className="text-primary">GitHub Repository</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-2xl text-muted-foreground mb-8">
              Get comprehensive summaries, track stars, discover cool facts, monitor pull requests, and stay updated with version releases - all in one powerful dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button
                size="lg"
                className="h-12 px-8 text-lg"
                onClick={() => isSignedIn ? window.location.href = "/dashboards" : signIn()}
              >
                {isSignedIn ? "Go to Dashboard" : "Start Free Analysis"}
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg bg-transparent">
                View Demo
              </Button>
            </div>
            <div className="w-full max-w-3xl mt-8 flex justify-center">
              <div className="relative w-full">
                <Image
                  src="/next.svg"
                  width={800}
                  height={400}
                  alt="Dandi GitHub Analyzer Dashboard"
                  className="rounded-lg border shadow-2xl mx-auto bg-white"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-28 bg-muted/50 flex flex-col items-center">
          <div className="w-full max-w-6xl px-4 md:px-0 flex flex-col items-center">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center">
              Everything You Need to Analyze GitHub Repos
            </h2>
            <p className="max-w-3xl text-muted-foreground text-lg md:text-xl text-center mb-10">
              Our AI-powered platform provides comprehensive insights that help you understand any repository at a glance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 mb-2 text-primary mx-auto" />
                  <CardTitle className="text-center">Smart Summaries</CardTitle>
                  <CardDescription className="text-center">
                    Get AI-generated summaries that explain what the repository does, its main purpose, and key technologies used.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Star className="h-8 w-8 mb-2 text-primary mx-auto" />
                  <CardTitle className="text-center">Star Analytics</CardTitle>
                  <CardDescription className="text-center">
                    Track star growth over time, analyze trending patterns, and understand repository popularity metrics.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 mb-2 text-primary mx-auto" />
                  <CardTitle className="text-center">Cool Facts</CardTitle>
                  <CardDescription className="text-center">
                    Discover interesting statistics, contributor insights, and unique characteristics that make each repo special.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <GitPullRequest className="h-8 w-8 mb-2 text-primary mx-auto" />
                  <CardTitle className="text-center">PR Insights</CardTitle>
                  <CardDescription className="text-center">
                    Monitor the latest important pull requests, track merge patterns, and understand development activity.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <TrendingUp className="h-8 w-8 mb-2 text-primary mx-auto" />
                  <CardTitle className="text-center">Version Updates</CardTitle>
                  <CardDescription className="text-center">
                    Stay informed about new releases, version history, and important updates across all your tracked repositories.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Github className="h-8 w-8 mb-2 text-primary mx-auto" />
                  <CardTitle className="text-center">Multi-Repo Dashboard</CardTitle>
                  <CardDescription className="text-center">
                    Analyze multiple repositories simultaneously with our comprehensive dashboard and comparison tools.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-16 md:py-28 flex flex-col items-center bg-background">
          <div className="w-full max-w-6xl px-4 md:px-0 flex flex-col items-center">
            <Badge variant="outline" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center">Choose Your Plan</h2>
            <p className="max-w-3xl text-muted-foreground text-lg md:text-xl text-center mb-10">
              Start free and scale as you grow. All plans include our core analysis features.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {/* Free Tier */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="text-2xl">Free</CardTitle>
                  <CardDescription>Perfect for getting started</CardDescription>
                  <div className="text-4xl font-bold">
                    $0<span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">5 repository analyses per month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Basic summaries and insights</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Star tracking</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-transparent" variant="outline" onClick={() => signIn()}>
                    Get Started Free
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Tier */}
              <Card className="relative border-primary">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                <CardHeader>
                  <CardTitle className="text-2xl">Pro</CardTitle>
                  <CardDescription>For serious developers and teams</CardDescription>
                  <div className="text-4xl font-bold">
                    $19<span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">100 repository analyses per month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Advanced AI insights and cool facts</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">PR monitoring and alerts</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Version update notifications</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Multi-repo dashboard</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => signIn()}>
                    Start Pro Trial
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Tier */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
                  <CardDescription>For large teams and organizations</CardDescription>
                  <div className="text-4xl font-bold">
                    $99<span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Unlimited repository analyses</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Custom AI models and insights</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Advanced analytics and reporting</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Team collaboration features</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">API access</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">24/7 dedicated support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-transparent" variant="outline" onClick={() => window.location.href = 'mailto:sales@dandi.com'}>
                    Contact Sales
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-28 bg-muted/50 flex flex-col items-center">
          <div className="w-full max-w-4xl px-4 md:px-0 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Ready to Analyze Your First Repository?
            </h2>
            <p className="max-w-xl text-muted-foreground text-lg md:text-xl mb-8">
              Join thousands of developers who trust Dandi to understand their GitHub repositories better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="h-12 px-8 text-lg"
                onClick={() => isSignedIn ? window.location.href = "/dashboards" : signIn()}
              >
                {isSignedIn ? "Go to Dashboard" : "Start Free Analysis"}
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg bg-transparent">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-8 border-t bg-white/80">
        <p className="text-xs text-muted-foreground">© 2024 Dandi GitHub Analyzer. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}
