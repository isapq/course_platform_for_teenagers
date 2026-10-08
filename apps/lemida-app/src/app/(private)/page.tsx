import {
  Box, 
  Button, 
  Typography
} from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Box
        component="main"
        sx={{
          bgcolor: "primary.main",
        }}
      >
        <Box>
          <Typography variant="h1">
            Isaque Pereira dos Santos
          </Typography>

          <Typography variant="h3">
            Especialização de IA - TURMA 2026.1
          </Typography>

          <Typography variant="h3">
            Última matéria: Engenharia de prompt
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: "secondary.main"
          }}
        >
          <Typography variant="h1">
            60% concluido
          </Typography>

          <Box>
            <Image 
              src="/icons/icon_orange_octopus.png" 
              alt="icone polvo" 
              width={70}
              height={70}
            />
            <Image 
              src="/icons/icon_orange_octopus.png" 
              alt="icone polvo"
              width={70}
              height={70}
            />
          </Box>
        </Box>

        <Box>
          <Typography variant="h1">
            Conquistas
          </Typography>

          <Box
            sx={{
              bgcolor: "background.default"
            }}
          >
          </Box>
        </Box>
      </Box>
    </div>
  );
}
