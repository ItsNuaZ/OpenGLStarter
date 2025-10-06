#version 330 core

out vec4 colour;
in vec4 vCol;
in vec2 TexCoord;
in vec3 Normal;
in vec3 FragPos;

uniform vec3 lightColour;
uniform vec3 lightPos;
uniform vec3 viewPos;

uniform sampler2D texture1;

vec3 ambientLight()
{
    float ambientStrength = 0.1f;
    vec3 ambient = ambientStrength * lightColour;

    return ambient;
}

vec3 diffuseLight()
{
    float diffuseStrength = 0.8f;

    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos);

    float diff = max(dot(norm, lightDir), 0.0f);
    vec3 diffuse = diffuseStrength * diff * lightColour;
    
    return diffuse;
}

vec3 specularLight()
{
    float specularStrength = 0.8f;
    float shininess = 64.0f;

    vec3 lightDir = normalize(lightPos - FragPos);
    vec3 norm = normalize(Normal);
    vec3 reflectDir = reflect(-lightDir, norm);
    vec3 viewDir = normalize(viewPos - FragPos);

    vec3 halfDir = normalize((lightDir + viewDir) / 2.0f);
    float spec = pow(max(dot(norm, halfDir), 0.0f), shininess);

    vec3 specular = specularStrength * spec * lightColour;

    return specular;
}

void main()
{
    colour = texture(texture1, TexCoord) * vec4(ambientLight() + diffuseLight() + specularLight(), 1.0);
}