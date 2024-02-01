#version 450

layout(location = 0) out vec4 outFragColor;

layout(binding = 0) uniform UniformBufferObject {
    vec3 resolution;
    float time;
} ubo;

void main()
{
  vec2 fragCoord = gl_FragCoord.xy;
  fragCoord.y = ubo.resolution.y-fragCoord.y;

  for (outFragColor = .1 * vec4(fragCoord / ubo.resolution.y, 1, 1) - .06; 
       fragCoord.x-- > -2e2;
       outFragColor *= .9 + .1 * length(cos(.7 * outFragColor.x + vec3(outFragColor.z + ubo.time, outFragColor.xy))) + .01 * cos(4. * outFragColor.y));
  
  outFragColor = (outFragColor + outFragColor.z) * .1;

  outFragColor.rgb = ((exp2(outFragColor.rgb)-1.0)-outFragColor.rgb*0.693147)*3.258891;
}