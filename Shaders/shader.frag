#version 330 core

out vec4 colour;
in vec4 vCol;
in vec2 TexCoord;

uniform sampler2D texture1;

void main()
{
    colour = texture(texture1, TexCoord);
}