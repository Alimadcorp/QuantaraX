import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Atom, Users, MessageSquare, Zap, Shield, Heart } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="container px-4 py-12 max-w-4xl mx-auto">
            <div className="mb-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/10 mb-6 border border-cyan-500/30">
                    <Atom className="w-10 h-10 text-cyan-400 animate-spin-slow" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    About QuantaraX
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    The premier community for quantum physics enthusiasts, researchers, and curious minds.
                </p>
            </div>

            <div className="space-y-8 mb-12">
                <Card className="bg-slate-900/40 border-slate-800">
                    <CardContent className="p-8">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <Zap className="w-6 h-6 text-cyan-400" />
                            Our Mission
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            QuantaraX exists to foster meaningful discussions about quantum physics, from fundamental theory to cutting-edge applications.
                            We believe that the best insights emerge when diverse perspectives collide—students, researchers, engineers, and enthusiasts
                            all contribute to our collective understanding of the quantum realm.
                        </p>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-slate-900/40 border-slate-800 hover:border-cyan-500/30 transition-all">
                        <CardContent className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 border border-cyan-500/30">
                                <Users className="w-6 h-6 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Community Driven</h3>
                            <p className="text-sm text-muted-foreground">
                                Built by physicists, for physicists. Every feature is designed to facilitate deep, technical discussions.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/40 border-slate-800 hover:border-purple-500/30 transition-all">
                        <CardContent className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/30">
                                <MessageSquare className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Quality Discussions</h3>
                            <p className="text-sm text-muted-foreground">
                                Moderated to maintain high signal-to-noise ratio. Rigorous but welcoming to learners.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/40 border-slate-800 hover:border-green-500/30 transition-all">
                        <CardContent className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 border border-green-500/30">
                                <Shield className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Privacy First</h3>
                            <p className="text-sm text-muted-foreground">
                                Your data is yours. No tracking, no ads, no algorithmic manipulation of content.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/40 border-slate-800 hover:border-pink-500/30 transition-all">
                        <CardContent className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4 border border-pink-500/30">
                                <Heart className="w-6 h-6 text-pink-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Open Source</h3>
                            <p className="text-sm text-muted-foreground">
                                Transparency in code and governance. Contribute on GitHub and help shape the future.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/30">
                <CardContent className="p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Join the Conversation</h2>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Whether you're exploring the measurement problem, debugging quantum circuits, or pondering the nature of reality itself—
                        there's a place for you here.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Badge variant="quantum" className="text-sm px-4 py-2">89,902 Members</Badge>
                        <Badge variant="cosmos" className="text-sm px-4 py-2">1.2M Posts</Badge>
                        <Badge variant="outline" className="text-sm px-4 py-2">54,203 Threads</Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
