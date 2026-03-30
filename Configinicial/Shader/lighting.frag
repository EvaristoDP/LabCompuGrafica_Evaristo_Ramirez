#version 330 core
struct Material
{
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;
};

struct Light
{
    vec3 position;
    
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

in vec3 FragPos;
in vec3 Normal;
in vec2 TexCoords;

out vec4 color;

uniform vec3 viewPos;
uniform Material material;

//Definir las luces.
uniform Light sol;
uniform Light luna;

uniform sampler2D texture_diffuse;

//Definir funcion
vec3 CalcLight(Light light, vec3 normal, vec3 fragPos, vec3 viewDir)
{
    //ambient
    vec3 ambient = light.ambient * material.diffuse;
    
    //difusse
    vec3 lightDir = normalize(light.position - fragPos);
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse light.diffuse * diff * material.diffuse;

    //specular
    vec3 reflectDir = reflect(-lightDir, normal);
    floar spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
    vec3 specular = light.specular * (spec * material.specular);

    return (ambient + diffuse + specular);
}

void main()
{
    vec3 norm = normalize(Normal);
    vec3 viewDir = normalize(viewPos - FragPos);

    vec3 result = CalcLight(sol, norm, FragPos, viewDir);

    result += CalcLight(luna, norm, FragPos, viewDir);

    color = vec4(result, 1.0f) * texture(texture_diffuse, TexCoords);
}