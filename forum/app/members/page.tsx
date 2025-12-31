import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, MessageSquare, ThumbsUp, Calendar } from "lucide-react"

const TOP_MEMBERS = [
    { name: "QuantumParrot", rep: 4203, posts: 892, joined: "2024", rank: 1, specialty: "Quantum Computing" },
    { name: "HeisenbergFan", rep: 3890, posts: 1205, joined: "2023", rank: 2, specialty: "Quantum Mechanics" },
    { name: "SchrodingersCat", rep: 3421, posts: 756, joined: "2024", rank: 3, specialty: "Interpretations" },
    { name: "StringTheorist", rep: 2980, posts: 623, joined: "2023", rank: 4, specialty: "Particle Physics" },
    { name: "BellState", rep: 2654, posts: 489, joined: "2024", rank: 5, specialty: "Entanglement" },
    { name: "QubitMaster", rep: 2301, posts: 412, joined: "2025", rank: 6, specialty: "Algorithms" },
    { name: "WaveFunctionCollapse", rep: 2156, posts: 378, joined: "2024", rank: 7, specialty: "Measurement" },
    { name: "CondensedMatterGrid", rep: 1987, posts: 345, joined: "2023", rank: 8, specialty: "Condensed Matter" },
]

export default function MembersPage() {
    return (
        <div className="container px-4 py-12 max-w-6xl mx-auto">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    Top Contributors
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    The brilliant minds shaping quantum discussions across the forum.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TOP_MEMBERS.map((member) => (
                    <Card
                        key={member.name}
                        className={`group hover:border-cyan-500/50 transition-all cursor-pointer bg-slate-900/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] ${member.rank <= 3 ? 'border-cyan-500/30' : ''
                            }`}
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xl font-bold">
                                        {member.name.substring(0, 2).toUpperCase()}
                                    </div>
                                </div>
                                {member.rank <= 3 && (
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${member.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                                            member.rank === 2 ? 'bg-slate-400/20 text-slate-300' :
                                                'bg-orange-500/20 text-orange-400'
                                        }`}>
                                        <Trophy className="w-3 h-3" />
                                        <span className="text-xs font-bold">#{member.rank}</span>
                                    </div>
                                )}
                            </div>

                            <h3 className="text-lg font-bold mb-1 group-hover:text-cyan-400 transition-colors">
                                {member.name}
                            </h3>
                            <Badge variant="outline" className="mb-4 text-[10px]">
                                {member.specialty}
                            </Badge>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <ThumbsUp className="w-4 h-4 text-cyan-500/70" />
                                        <span>Reputation</span>
                                    </div>
                                    <span className="font-mono text-cyan-400">{member.rep.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-purple-500/70" />
                                        <span>Posts</span>
                                    </div>
                                    <span className="font-mono text-purple-400">{member.posts.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-slate-500" />
                                        <span>Joined</span>
                                    </div>
                                    <span className="font-mono text-slate-400">{member.joined}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
