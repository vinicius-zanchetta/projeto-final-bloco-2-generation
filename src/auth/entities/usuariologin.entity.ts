import { ApiProperty } from "@nestjs/swagger"

export class UsuarioLogin {

    @ApiProperty({example: "farmacia1@email.com.br"})
    public usuario: string

    
    @ApiProperty({example: "admin123"})
    public senha: string

}