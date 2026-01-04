
export const CATEGORIES = [
    {
        id: "quantum-mechanics",
        title: "Quantum Mechanics",
        description: "Discuss the fundamental principles of nature at the smallest scales.",
        color: "cyan",
        slug: "quantum-mechanics",
        topics: 1542,
        posts: 8903,
    },
    {
        id: "quantum-computing",
        title: "Quantum Computing",
        description: "Qubits, quantum gates, algorithms, and hardware implementations.",
        color: "purple",
        slug: "quantum-computing",
        topics: 892,
        posts: 4210,
    },
    {
        id: "particle-physics",
        title: "Particle Physics",
        description: "The standard model, fermions, bosons, and beyond.",
        color: "pink",
        slug: "particle-physics",
        topics: 620,
        posts: 3100,
    },
    {
        id: "research-papers",
        title: "Research Papers",
        description: "Discussion and analysis of the latest arxiv preprints and journals.",
        color: "blue",
        slug: "research-papers",
        topics: 340,
        posts: 1205,
    },
]

export const RECENT_THREADS = [
    {
        id: "1",
        title: "Does the observer effect actually require a conscious observer?",
        author: "HeisenbergFan",
        category: "Quantum Mechanics",
        replies: 42,
        views: 1205,
        lastActive: "10m ago",
        tags: ["Measurement Problem", "Philosophy"],
        hot: true,
    },
    {
        id: "2",
        title: "Implementing Grover's Algorithm on Qiskit",
        author: "QubitMaster",
        category: "Quantum Computing",
        replies: 12,
        views: 340,
        lastActive: "2h ago",
        tags: ["Qiskit", "Algorithms"],
        hot: false,
    },
    {
        id: "3",
        title: "Is String Theory dead? Let's discuss.",
        author: "StringTheorist",
        category: "Particle Physics",
        replies: 156,
        views: 5600,
        lastActive: "5m ago",
        tags: ["Debate", "Theory"],
        hot: true,
    },
    {
        id: "4",
        title: "Quantum Entanglement vs Classical Correlation speed limits",
        author: "BellState",
        category: "Quantum Mechanics",
        replies: 28,
        views: 890,
        lastActive: "1d ago",
        tags: ["Entanglement", "Bell Inequality"],
        hot: false,
    },
    {
        id: "5",
        title: "New room-temperature superconductor claims - thoughts?",
        author: "CondensedMatterGrid",
        category: "Research Papers",
        replies: 89,
        views: 3100,
        lastActive: "3h ago",
        tags: ["Superconductivity", "LK-99"],
        hot: true,
    },
]

export const POSTS = [
    {
        id: "p1",
        author: "HeisenbergFan",
        role: "Admin",
        content: `
      <p>I've been thinking about the observer effect lately. It is often stated that "observation" collapses the wave function.</p>
      <br>
      <p>However, does this actually require a <strong>conscious</strong> observer? Or is interaction with a macroscopic system sufficient?</p>
      <br>
      <p>Thoughts?</p>
    `,
        timestamp: "2 hours ago",
        likes: 45
    },
    {
        id: "p2",
        author: "SchrodingersCat",
        role: "Member",
        content: `
      <p>Ideally, any interaction that extracts information from the system causes decoherence. Consciousness is not required.</p>
      <p>The "conscious observer" idea is more of a philosophical interpretation (Wigner's Friend) than standard QM.</p>
    `,
        timestamp: "1 hour ago",
        likes: 12
    },
    {
        id: "p3",
        author: "QuantumParrot",
        role: "Moderator",
        content: `
      <p>Agreed. Decoherence theory explains this quite well without needing consciousness. The environment acts as the observer.</p>
    `,
        timestamp: "45 mins ago",
        likes: 8
    }
]
