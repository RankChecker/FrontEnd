import style from "./formSearch.module.scss"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function FormSearch() {
    return (
        <div className={style.formContent}>
            <h3>Nova busca</h3>
            <form>
                <div className={style.allInputs}>
                    <TextField
                        id="site-adress"
                        label="Endereço do Site"
                        variant="standard"
                    />
                    <TextField
                        id="name-client"
                        label="Nome do Cliente"
                        variant="standard"
                    />
                    <TextField
                        id="key-word"
                        label="Palavras chave"
                        multiline
                        rows={6}
                        variant="standard"
                        className={style.lastInput}
                    />
                </div>

                <Button variant="contained">Iniciar busca</Button>
            </form>
        </div>
    )
}