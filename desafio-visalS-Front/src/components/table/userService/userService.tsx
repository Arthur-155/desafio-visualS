import type { User } from '../user/User'

const URL = "http://localhost:8081/v1/users"

//=================================================================
//                   findAll

export async function findAll(name?: string): Promise<User[]> {
    const query = name ? `?name=${encodeURIComponent(name)}` : "";
    const response = await fetch(`${URL}${query}`);

    //se der erro pra pegar o response da requisição, solta erro 
    if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
    }

    const data: Omit<User, "selected">[] = await response.json();


    return data.map((user) => ({
        ...user,
        selected: false
    }));
}

//=================================================================
//                  findByIdOrThrowNotFound

export async function findById(id: number): Promise<User> {
    const response = await fetch(`${URL}/${id}`);

    if (!response.ok) {
        throw new Error("Erro ao buscar usuário pelo id");
    }

    const data = await response.json();
    return {
        ...data,
        selected: false
    }
}

//=================================================================
//                         save

export async function save(user: Omit<User, "selected">): Promise<User> {
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error("Erro ao criar usuário");
    }

    const data = await response.json()

    return {
        ...data,
        selected:false
    };
}

//=================================================================
//                         deleteById

export async function deleteById(id: number): Promise<void> {
    const response = await fetch(`${URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar usuários");
    }
}

//=================================================================
//                       updateById

export async function update(user: Omit<User, "selected">): Promise<void> {
    const response = await fetch(`${URL}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar usuário");
    }
}

//=================================================================