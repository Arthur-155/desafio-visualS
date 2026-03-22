import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './EditUserInfo.css';
import { findById, update } from '../table/userService/userService';
import { useLocation } from 'react-router-dom';





export default function EditUserInfo() {

    //=================================================================
    //criando a função de navegação
    const navigate = useNavigate();
    //setando location pra pegar o id do navigate
    const location = useLocation();
    //instancia de userId pra receber o id que location guardou do navigate
    const userId = location.state?.id as number | undefined;

    //=================================================================
    //campos que serão enviados ao meu backend
    type FormData = {
        id: number;
        selected: boolean;
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
        id: 0,
        selected: false,
        name: '',
        email: '',
        cellPhone: '',
        city: '',
    });
    //=================================================================
    //Carregando as informações dos usuários quando a tela de edição carrega
    React.useEffect(() => {
        async function loadUser() {
            try {
                if (userId == null) {
                    setErrorMessage("Usuário não informado para edição.");
                    return;
                }

                const user = await findById(userId);

                if (user.id == null) {
                    setErrorMessage("Usuário retornado sem id.");
                    return;
                }

                setFormData({
                    id: user.id,
                    selected: user.selected,
                    name: user.name,
                    email: user.email,
                    cellPhone: user.cellPhone,
                    city: user.city
                });
            } catch (error) {
                setErrorMessage("Houve algum erro ao buscar o usuário.");
            }
        }

        loadUser();
    }, [userId]);

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
            await update({
                id: formData.id,
                name: formData.name,
                email: formData.email,
                cellPhone: formData.cellPhone,
                city: formData.city
            });

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
                        Editar Usuário
                    </Typography>
                </Breadcrumbs>
            </Stack>

            <Box className="infos">
                <Typography variant="h4" gutterBottom>
                    Editar Usuário
                </Typography>

                <Typography
                    variant="overline"
                    gutterBottom
                    sx={{ display: 'block' }}
                >
                    Preencha os campos que deseja alterar
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