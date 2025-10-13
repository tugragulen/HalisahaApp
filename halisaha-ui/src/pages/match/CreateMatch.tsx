import React, {useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {ArrowBack, Delete, EmojiEvents, PersonAdd, Sports} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {CreateMatchModel, PlayerModel, PositionModel} from "../../model/MatchModel";

const CreateMatch = () => {
    const navigate = useNavigate();

    // Maç bilgileri
    const [matchData, setMatchData] = useState<CreateMatchModel>({
        title: '',
        date: '',
        time: '',
        location: '',
        format: '7v7',
        visibility: 'PUBLIC',
        maxPlayers: 14
    });

    // Oyuncu yönetimi
    const [playerName, setPlayerName] = useState('');
    const [players, setPlayers] = useState<PlayerModel[]>([]);
    const [draggedPlayer, setDraggedPlayer] = useState<PlayerModel | null>(null);

    // 7v7 saha pozisyonları (örnek dizilim)
    const [fieldPositions, setFieldPositions] = useState<PositionModel[]>([
        // A Takımı pozisyonları (sol taraf)
        {id: 'a-gk', x: 10, y: 50, label: 'KL', player: undefined},
        {id: 'a-def1', x: 25, y: 30, label: 'DF', player: undefined},
        {id: 'a-def2', x: 25, y: 70, label: 'DF', player: undefined},
        {id: 'a-mid1', x: 40, y: 25, label: 'OC', player: undefined},
        {id: 'a-mid2', x: 35, y: 50, label: 'OC', player: undefined},
        {id: 'a-mid3', x: 40, y: 75, label: 'OC', player: undefined},
        {id: 'a-fwd', x: 45, y: 50, label: 'FW', player: undefined},

        // B Takımı pozisyonları (sağ taraf)
        {id: 'b-gk', x: 90, y: 50, label: 'KL', player: undefined},
        {id: 'b-def1', x: 75, y: 30, label: 'DF', player: undefined},
        {id: 'b-def2', x: 75, y: 70, label: 'DF', player: undefined},
        {id: 'b-mid1', x: 60, y: 25, label: 'OC', player: undefined},
        {id: 'b-mid2', x: 65, y: 50, label: 'OC', player: undefined},
        {id: 'b-mid3', x: 60, y: 75, label: 'OC', player: undefined},
        {id: 'b-fwd', x: 55, y: 50, label: 'FW', player: undefined},
    ]);

    // Oyuncu ekleme
    const handleAddPlayer = () => {
        if (playerName.trim()) {
            const newPlayer: PlayerModel = {
                id: Date.now().toString(),
                name: playerName.trim(),
                team: 'RESERVE'
            };
            setPlayers([...players, newPlayer]);
            setPlayerName('');
        }
    };

    // Oyuncu silme
    const handleRemovePlayer = (playerId: string) => {
        setPlayers(players.filter(p => p.id !== playerId));
        // Sahadan da kaldır
        setFieldPositions(fieldPositions.map(pos =>
            pos.player?.id === playerId ? {...pos, player: undefined} : pos
        ));
    };

    // Kaleci işaretleme
    const toggleGoalkeeper = (playerId: string) => {
        setPlayers(players.map(p =>
            p.id === playerId ? {...p, isGoalkeeper: !p.isGoalkeeper} : p
        ));
        setFieldPositions(fieldPositions.map(pos =>
            pos.player?.id === playerId
                ? {...pos, player: {...pos.player, isGoalkeeper: !pos.player.isGoalkeeper}}
                : pos
        ));
    };

    // Kaptan işaretleme
    const toggleCaptain = (playerId: string) => {
        setPlayers(players.map(p =>
            p.id === playerId ? {...p, isCaptain: !p.isCaptain} : p
        ));
        setFieldPositions(fieldPositions.map(pos =>
            pos.player?.id === playerId
                ? {...pos, player: {...pos.player, isCaptain: !pos.player.isCaptain}}
                : pos
        ));
    };

    // Drag & Drop handlers
    const handleDragStart = (player: PlayerModel) => {
        setDraggedPlayer(player);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDropOnPosition = (positionId: string) => {
        if (draggedPlayer) {
            const position = fieldPositions.find(p => p.id === positionId);
            if (position) {
                // Oyuncuyu pozisyona yerleştir
                setFieldPositions(fieldPositions.map(pos => {
                    if (pos.id === positionId) {
                        return {...pos, player: draggedPlayer};
                    }
                    // Aynı oyuncuyu başka pozisyondan kaldır
                    if (pos.player?.id === draggedPlayer.id) {
                        return {...pos, player: undefined};
                    }
                    return pos;
                }));

                // Oyuncuyu takıma ata
                const team = positionId.startsWith('a-') ? 'A' : 'B';
                setPlayers(players.map(p =>
                    p.id === draggedPlayer.id ? {...p, team: team as any} : p
                ));
            }
            setDraggedPlayer(null);
        }
    };

    const handleDropOnReserve = () => {
        if (draggedPlayer) {
            // Sahadan kaldır
            setFieldPositions(fieldPositions.map(pos =>
                pos.player?.id === draggedPlayer.id ? {...pos, player: undefined} : pos
            ));
            // Yedeklere al
            setPlayers(players.map(p =>
                p.id === draggedPlayer.id ? {...p, team: 'RESERVE'} : p
            ));
            setDraggedPlayer(null);
        }
    };

    // Takımlara göre oyuncuları filtrele
    const teamAPlayers = players.filter(p => p.team === 'A');
    const teamBPlayers = players.filter(p => p.team === 'B');
    const reservePlayers = players.filter(p => p.team === 'RESERVE');

    return (
        <Box sx={{p: 3}}>
            {/* Header */}
            <Box display="flex" alignItems="center" mb={3}>
                <IconButton onClick={() => navigate(-1)} sx={{mr: 2}}>
                    <ArrowBack/>
                </IconButton>
                <Typography variant="h4">
                    Yeni Maç Oluştur
                </Typography>
            </Box>

            <Box display="flex" gap={3} flexDirection={{xs: 'column', md: 'row'}}>
                {/* Sol Panel - Maç Bilgileri ve Oyuncu Yönetimi */}
                <Box flex="0 0 33%">
                    {/* Maç Bilgileri */}
                    <Paper elevation={3} sx={{p: 3, mb: 3}}>
                        <Typography variant="h6" gutterBottom>
                            Maç Bilgileri
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                label="Maç Adı"
                                fullWidth
                                value={matchData.title}
                                onChange={(e) => setMatchData({...matchData, title: e.target.value})}
                            />
                            <TextField
                                label="Tarih"
                                type="date"
                                fullWidth
                                InputLabelProps={{shrink: true}}
                                value={matchData.date}
                                onChange={(e) => setMatchData({...matchData, date: e.target.value})}
                            />
                            <TextField
                                label="Saat"
                                type="time"
                                fullWidth
                                InputLabelProps={{shrink: true}}
                                value={matchData.time}
                                onChange={(e) => setMatchData({...matchData, time: e.target.value})}
                            />
                            <TextField
                                label="Konum"
                                fullWidth
                                value={matchData.location}
                                onChange={(e) => setMatchData({...matchData, location: e.target.value})}
                            />
                            <FormControl fullWidth>
                                <InputLabel>Format</InputLabel>
                                <Select
                                    value={matchData.format}
                                    label="Format"
                                    onChange={(e) => setMatchData({...matchData, format: e.target.value})}
                                >
                                    <MenuItem value="5v5">5v5</MenuItem>
                                    <MenuItem value="7v7">7v7</MenuItem>
                                    <MenuItem value="11v11">11v11</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Görünürlük</FormLabel>
                                <RadioGroup
                                    row
                                    value={matchData.visibility}
                                    onChange={(e) => setMatchData({...matchData, visibility: e.target.value as any})}
                                >
                                    <FormControlLabel value="PUBLIC" control={<Radio/>} label="Herkese Açık"/>
                                    <FormControlLabel value="PRIVATE" control={<Radio/>} label="Özel"/>
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Paper>

                    {/* Oyuncu Ekleme */}
                    <Paper elevation={3} sx={{p: 3, mb: 3}}>
                        <Typography variant="h6" gutterBottom>
                            Oyuncu Ekle
                        </Typography>
                        <Box display="flex" gap={1}>
                            <TextField
                                label="Oyuncu Adı"
                                fullWidth
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                            />
                            <IconButton color="primary" onClick={handleAddPlayer}>
                                <PersonAdd/>
                            </IconButton>
                        </Box>
                    </Paper>

                    {/* Yedek Oyuncular */}
                    <Paper
                        elevation={3}
                        sx={{p: 3}}
                        onDragOver={handleDragOver}
                        onDrop={handleDropOnReserve}
                    >
                        <Typography variant="h6" gutterBottom>
                            Yedek Oyuncular ({reservePlayers.length})
                        </Typography>
                        <Divider sx={{mb: 2}}/>
                        <Box display="flex" flexDirection="column" gap={1}>
                            {reservePlayers.map(player => (
                                <Card
                                    key={player.id}
                                    draggable
                                    onDragStart={() => handleDragStart(player)}
                                    sx={{
                                        cursor: 'grab',
                                        '&:active': {cursor: 'grabbing'},
                                        bgcolor: 'grey.100'
                                    }}
                                >
                                    <CardContent sx={{
                                        py: 1,
                                        px: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Typography>{player.name}</Typography>
                                        <IconButton size="small" onClick={() => handleRemovePlayer(player.id)}>
                                            <Delete fontSize="small"/>
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            ))}
                            {reservePlayers.length === 0 && (
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Henüz yedek oyuncu yok
                                </Typography>
                            )}
                        </Box>
                    </Paper>
                </Box>

                {/* Sağ Panel - Saha Görünümü */}
                <Box flex="1">
                    <Paper elevation={3} sx={{p: 3}}>
                        <Typography variant="h6" gutterBottom>
                            Saha Düzeni (7v7)
                        </Typography>

                        {/* Saha */}
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: '600px',
                                backgroundColor: '#2d7d2d',
                                backgroundImage: 'linear-gradient(90deg, #2d7d2d 50%, #3a9d3a 50%)',
                                border: '3px solid white',
                                borderRadius: '8px',
                                mt: 2
                            }}
                        >
                            {/* Orta çizgi */}
                            <Box sx={{
                                position: 'absolute',
                                left: '50%',
                                top: 0,
                                bottom: 0,
                                width: '2px',
                                bgcolor: 'white'
                            }}/>

                            {/* Orta daire */}
                            <Box sx={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '120px',
                                height: '120px',
                                border: '2px solid white',
                                borderRadius: '50%'
                            }}/>

                            {/* Pozisyonlar */}
                            {fieldPositions.map(position => (
                                <Box
                                    key={position.id}
                                    onDragOver={handleDragOver}
                                    onDrop={() => handleDropOnPosition(position.id)}
                                    sx={{
                                        position: 'absolute',
                                        left: `${position.x}%`,
                                        top: `${position.y}%`,
                                        transform: 'translate(-50%, -50%)',
                                        width: '80px',
                                        height: '80px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {position.player ? (
                                        <Card
                                            draggable
                                            onDragStart={() => handleDragStart(position.player!)}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'grab',
                                                bgcolor: position.id.startsWith('a-') ? '#1976d2' : '#d32f2f',
                                                color: 'white',
                                                '&:active': {cursor: 'grabbing'},
                                                position: 'relative',
                                                border: position.player.isCaptain ? '3px solid gold' : 'none'
                                            }}
                                        >
                                            {position.player.isCaptain && (
                                                <EmojiEvents sx={{
                                                    position: 'absolute',
                                                    top: 2,
                                                    left: 2,
                                                    fontSize: '14px',
                                                    color: 'gold'
                                                }}/>
                                            )}
                                            {position.player.isGoalkeeper && (
                                                <Sports sx={{
                                                    position: 'absolute',
                                                    top: 2,
                                                    right: 2,
                                                    fontSize: '14px',
                                                    color: 'yellow'
                                                }}/>
                                            )}
                                            <Typography variant="caption" fontWeight="bold">
                                                {position.player.name}
                                            </Typography>
                                            <Typography variant="caption" fontSize="10px">
                                                {position.label}
                                            </Typography>
                                        </Card>
                                    ) : (
                                        <Box sx={{
                                            width: '100%',
                                            height: '100%',
                                            border: '2px dashed white',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: 'rgba(255,255,255,0.1)'
                                        }}>
                                            <Typography variant="caption" color="white">
                                                {position.label}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>

                        {/* Takım Bilgileri ve Kontroller */}
                        <Box mt={3}>
                            <Box display="flex" justifyContent="space-around" mb={2}>
                                <Box textAlign="center">
                                    <Chip
                                        label={`A Takımı (${teamAPlayers.length}/7)`}
                                        color="primary"
                                        sx={{fontWeight: 'bold', mb: 1}}
                                    />
                                    <Box display="flex" flexDirection="column" gap={0.5}>
                                        {teamAPlayers.map(player => (
                                            <Box key={player.id} display="flex" alignItems="center" gap={1}>
                                                <Typography variant="caption">{player.name}</Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => toggleGoalkeeper(player.id)}
                                                    color={player.isGoalkeeper ? "warning" : "default"}
                                                    title="Kaleci"
                                                >
                                                    <Sports fontSize="small"/>
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => toggleCaptain(player.id)}
                                                    color={player.isCaptain ? "warning" : "default"}
                                                    title="Kaptan"
                                                >
                                                    <EmojiEvents fontSize="small"/>
                                                </IconButton>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                                <Box textAlign="center">
                                    <Chip
                                        label={`B Takımı (${teamBPlayers.length}/7)`}
                                        color="error"
                                        sx={{fontWeight: 'bold', mb: 1}}
                                    />
                                    <Box display="flex" flexDirection="column" gap={0.5}>
                                        {teamBPlayers.map(player => (
                                            <Box key={player.id} display="flex" alignItems="center" gap={1}>
                                                <Typography variant="caption">{player.name}</Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => toggleGoalkeeper(player.id)}
                                                    color={player.isGoalkeeper ? "warning" : "default"}
                                                    title="Kaleci"
                                                >
                                                    <Sports fontSize="small"/>
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => toggleCaptain(player.id)}
                                                    color={player.isCaptain ? "warning" : "default"}
                                                    title="Kaptan"
                                                >
                                                    <EmojiEvents fontSize="small"/>
                                                </IconButton>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                            <Typography variant="caption" color="text.secondary" textAlign="center" display="block"
                                        mt={2}>
                                💡 Kaleci ve kaptan işaretlemek için takım listesindeki butonları kullanın
                            </Typography>
                        </Box>

                        {/* Kaydet Butonu */}
                        <Box display="flex" justifyContent="center" mt={3}>
                            <Button
                                variant="contained"
                                size="large"
                                color="success"
                                sx={{px: 6}}
                            >
                                Maçı Oluştur
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateMatch;
