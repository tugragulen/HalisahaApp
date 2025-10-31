import React, {useState} from "react";
import {DndContext, DragEndEvent, useDraggable, useDroppable} from "@dnd-kit/core";

// --- Tipler ---
type Position = {
    id: string;
    x: number;
    y: number;
    player?: string;
    isOpponent?: boolean;
};

type Player = {
    id: string;
    name: string;
};

// --- Başlangıç oyuncuları ---
const initialPlayers: Player[] = [
    {id: "p1", name: "Ahmet"},
    {id: "p2", name: "Mehmet"},
    {id: "p3", name: "Ali"},
    {id: "p4", name: "Veli"},
    {id: "p5", name: "Can"},
    {id: "p6", name: "Emre"},
    {id: "p7", name: "Burak"},
];

// --- Kendi takım pozisyonları ---
const initialPositions: Position[] = [
    {id: "GK", x: 10, y: 170},
    {id: "DEF1", x: 120, y: 50},
    {id: "DEF2", x: 80, y: 170},
    {id: "DEF3", x: 120, y: 290},
    {id: "MID1", x: 250, y: 80},
    {id: "MID2", x: 250, y: 260},
    {id: "FWD", x: 280, y: 170},
];

// --- Rakip takım pozisyonları ---
const initialOpponentPositions: Position[] = [
    {id: "op1", x: 650, y: 50, isOpponent: true},
    {id: "op2", x: 650, y: 150, isOpponent: true},
    {id: "op3", x: 650, y: 250, isOpponent: true},
    {id: "op4", x: 550, y: 50, isOpponent: true},
    {id: "op5", x: 550, y: 150, isOpponent: true},
    {id: "op6", x: 550, y: 250, isOpponent: true},
    {id: "op7", x: 450, y: 150, isOpponent: true},
];

// --- Draggable component ---
const Draggable: React.FC<{ id: string; children: React.ReactNode }> = ({id, children}) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id});
    const style: React.CSSProperties = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        cursor: "grab",
        touchAction: "none",
    };
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
};

// --- Droppable component ---
const Droppable: React.FC<Position> = ({id, x, y, player, isOpponent}) => {
    const {isOver, setNodeRef} = useDroppable({id});
    return (
        <div
            ref={setNodeRef}
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: isOver ? "#b2f2bb" : isOpponent ? "#900" : "#f0f0f0",
                color: isOpponent ? "#fff" : "#000",
                border: "2px solid #999",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                cursor: "grab",
                transition: "background-color 0.2s",
            }}
        >
            {player ? player : "Boş"}
        </div>
    );
};

// --- TeamBuilder ---
export const TeamBuilder: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>(initialPlayers);
    const [positions, setPositions] = useState<Position[]>(initialPositions);
    const [opponentPositions, setOpponentPositions] = useState<Position[]>(initialOpponentPositions);

    // --- DragEnd ---
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over, delta} = event;
        if (!active) return;

        // Oyuncu sürüklendiyse
        const player = players.find((p) => p.id === active.id);
        if (player && over?.id) {
            const allPositions = [...positions, ...opponentPositions];
            allPositions.forEach((pos) => {
                if (pos.id === over.id) {
                    // Eğer pozisyon doluysa eski oyuncu listeye dönsün
                    if (pos.player) {
                        setPlayers((prev) => [
                            ...prev,
                            {id: pos.player as string, name: pos.player as string},
                        ]);
                    }
                }
            });

            setPositions((prev) =>
                prev.map((pos) =>
                    pos.id === over.id ? {...pos, player: player.name} : pos
                )
            );
            setOpponentPositions((prev) =>
                prev.map((pos) =>
                    pos.id === over.id ? {...pos, player: player.name} : pos
                )
            );

            setPlayers((prev) => prev.filter((p) => p.id !== active.id));
            return;
        }

        // Pozisyon kutusu taşınıyorsa
        const pos = [...positions, ...opponentPositions].find((p) => p.id === active.id);
        if (pos) {
            const updater = pos.isOpponent ? setOpponentPositions : setPositions;
            updater((prev) =>
                prev.map((p) =>
                    p.id === pos.id ? {...p, x: p.x + delta.x, y: p.y + delta.y} : p
                )
            );
        }
    };

    // --- Reset ---
    const resetField = () => {
        setPlayers(initialPlayers);
        setPositions(initialPositions.map((p) => ({...p, player: undefined})));
        setOpponentPositions(initialOpponentPositions.map((p) => ({...p, player: undefined})));
    };

    // --- Rastgele diz
    const randomizePositions = () => {
        const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
        setPositions((prev) =>
            prev.map((p, i) => ({
                ...p,
                player: shuffledPlayers[i]?.name,
            }))
        );
        setPlayers(shuffledPlayers.slice(positions.length));
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div style={{display: "flex", gap: 20, fontFamily: "sans-serif"}}>
                {/* Oyuncular */}
                <div style={{width: 200}}>
                    <h3>Oyuncular</h3>
                    {players.map((p) => (
                        <Draggable key={p.id} id={p.id}>
                            <div
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: 8,
                                    padding: 8,
                                    marginBottom: 8,
                                    backgroundColor: "#fff",
                                    textAlign: "center",
                                }}
                            >
                                {p.name}
                            </div>
                        </Draggable>
                    ))}

                    <button onClick={resetField} style={{marginTop: 10, padding: 6}}>
                        Sıfırla
                    </button>
                    <button onClick={randomizePositions} style={{marginTop: 6, padding: 6}}>
                        Rastgele Diz
                    </button>
                </div>

                {/* Saha */}
                <div
                    id="FIELD"
                    style={{
                        position: "relative",
                        width: 700,
                        height: 400,
                        background: "linear-gradient(to right, #4caf50, #81c784)",
                        borderRadius: 20,
                        border: "3px solid #333",
                    }}
                >
                    {/* Orta saha çizgisi */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: "50%",
                            width: 2,
                            height: "100%",
                            backgroundColor: "#fff",
                        }}
                    ></div>

                    {/* Kendi ceza sahası */}
                    <div
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 120,
                            width: 100,  // ceza sahası genişliği
                            height: 160,
                            border: "2px solid #fff",
                            borderRadius: 4,
                            boxSizing: "border-box",
                        }}
                    ></div>

                    {/* Rakip ceza sahası */}
                    <div
                        style={{
                            position: "absolute",
                            right: 0,
                            top: 120,
                            width: 100,
                            height: 160,
                            border: "2px solid #fff",
                            borderRadius: 4,
                            boxSizing: "border-box",
                        }}
                    ></div>

                    {/* Kendi oyuncular */}
                    {positions.map((pos) => (
                        <Draggable key={pos.id} id={pos.id}>
                            <Droppable {...pos} />
                        </Draggable>
                    ))}

                    {/* Rakip oyuncular */}
                    {opponentPositions.map((pos) => (
                        <Draggable key={pos.id} id={pos.id}>
                            <Droppable {...pos} />
                        </Draggable>
                    ))}
                </div>
            </div>
        </DndContext>
    );
};
