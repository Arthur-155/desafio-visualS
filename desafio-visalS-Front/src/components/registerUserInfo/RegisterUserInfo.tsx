import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './RegisterUserInfo.css';
import { save } from '../table/userService/userService';





export default function RegisterUserInfo() {

    //=================================================================
    //criando a função de navegação
    const navigate = useNavigate();

    //=================================================================
    //campos que serão enviados ao meu backend
    type FormData = {
        name: string;
        email: string;
        cellPhone: string;
        city: string;
    };
    //=================================================================

    //=================================================================
    // Setando os estados
    const [successMessage, setSuccessMessage] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    //=================================================================

    //=================================================================
    //criando estado inicial do formulário
    const [formData, setFormData] = React.useState<FormData>({
        name: '',
        email: '',
        cellPhone: '',
        city: '',
    });
    //=================================================================

    //=================================================================
    //Função para manipular cada campo do formulário, sem alterar demais campos.
    function handleChange(field: keyof FormData) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                ...prev,
                [field]: event.target.value,
            }));
        };
    }

    //=================================================================
    //função responsável por enviar os valores preenchidos para o backEnd
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            await save(formData);
            setErrorMessage("");
            setSuccessMessage("Usuário cadastrado com sucesso, voltando a página principal!");

            setTimeout(() => {
                navigate("/");
            }, 1500)
        } catch {
            setSuccessMessage("");
            setErrorMessage("Houve algum erro no momento de enviar a requisição!")
        }
    }
    //=================================================================

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            className="containerUserInfo"
        >
            <Stack spacing={2}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link
                        component={RouterLink}
                        to="/"
                        underline="hover"
                        color="inherit"
                    >
                        Página principal
                    </Link>

                    <Typography sx={{ color: 'text.primary' }}>
                        Registrar Usuário
                    </Typography>
                </Breadcrumbs>
            </Stack>

            <Box className="infos">
                <Typography variant="h4" gutterBottom>
                    Registrar Usuário
                </Typography>

                <Typography
                    variant="overline"
                    gutterBottom
                    sx={{ display: 'block' }}
                >
                    Todos os campos são obrigatórios
                </Typography>
            </Box>

            {successMessage && (
                <Typography color="success.main">
                    {successMessage}
                </Typography>
            )}

            {errorMessage && (
                <Typography color="error">
                    {errorMessage}
                </Typography>
            )}

            <Box className="infoFields">
                <TextField
                    required
                    label="Nome"
                    placeholder="Arthur"
                    value={formData.name}
                    onChange={handleChange('name')}
                    fullWidth
                />

                <TextField
                    required
                    label="Email"
                    placeholder="arthur@exemplo.com"
                    value={formData.email}
                    onChange={handleChange('email')}
                    fullWidth
                />

                <TextField
                    required
                    label="Telefone"
                    placeholder="(44)99999-0000"
                    value={formData.cellPhone}
                    onChange={handleChange('cellPhone')}
                    fullWidth
                />

                <TextField
                    required
                    label="Cidade"
                    placeholder="Maringá"
                    value={formData.city}
                    onChange={handleChange('city')}
                    fullWidth
                />
            </Box>

            <Stack direction="row-reverse" className="buttons">
                <Button type="submit" variant="contained">
                    Salvar Usuário
                </Button>
            </Stack>
        </Box>
    );
}