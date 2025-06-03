# Instrukcijos

1. Parsisiųsti failą arba klonuoti direktoriją.
2. 'server' aplanke susikurti '.env' failą ir įklijuoti savo MongoDB duomenis:

PORT=
DB_USER=
DB_USER_PASSWORD=
DB_CLUSTER=
DB_CLUSTER_ID=

3. VS Code programoje pasileisti 2 terminalus.
4. Pirmame terminale:
  4.1. Nusinaviguoti į /server aplanką.
  4.2. Paleisti 'npm i' komandą - parsiųsti viesiems reikalingiems moduliams.
  4.3. Paleisti 'npm run dev' komandą - paleisti serveriui.
5. Antrame terminale:
 5.1. Nusinaviguoti į /client aplanką.
 5.2. Paleisti 'npm i' komandą - parsiųsti viesiems reikalingiems moduliams.
 5.3. Paleisti 'npm start' komandą - paleisti puslapio projektą.
