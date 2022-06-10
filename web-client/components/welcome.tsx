import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";

export const Welcome = () => {
  return (
    <>
      <Box p={[1, 2, 4]}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack spacing={2}>
            <Typography color="primary" variant="h2">
              Humanitarius
            </Typography>
            <Typography variant="h5" color="gray">
              Pomagaj tak jak chcesz, gdzie chcesz
            </Typography>
            <div>
              <Link href="/posts/create" passHref>
                <MuiLink>Dodaj ogłoszenie</MuiLink>
              </Link>
              , lub{" "}
              <MuiLink
                onClick={() =>
                  document.querySelector("#ads")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                przeglądaj{" "}
              </MuiLink>
              ogłoszenia innych wolontariuszy.
            </div>
          </Stack>
          <Image
            alt="wolontariusze"
            src="/volunteer.png"
            width={300}
            height={300}
          />
        </Stack>
      </Box>
      <Divider sx={{ marginBottom: 2 }} />
    </>
  );
};
