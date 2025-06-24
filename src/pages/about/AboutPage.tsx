import React from 'react';
import { Users, Target, Award, Rocket, Globe, Shield, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transformando el Futuro del Trabajo en España
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Conectamos el talento español con oportunidades globales, creando un ecosistema donde la excelencia profesional y la innovación se encuentran.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-16 bg-white" style={{
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)'
        }}></div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Todo comenzó en 2023, cuando un grupo de emprendedores españoles identificó una brecha significativa en el mercado: la desconexión entre el abundante talento profesional español y las oportunidades globales.
                </p>
                <p className="mt-4">
                  Inspirados por nuestra propia experiencia en la búsqueda de talento cualificado, decidimos crear una plataforma que no solo conectara, sino que también potenciara el talento español en el escenario mundial.
                </p>
                <p className="mt-4">
                  Con el apoyo de mentores de Silicon Valley y la colaboración de expertos tecnológicos españoles, transformamos una idea local en una plataforma innovadora que hoy sirve como puente entre profesionales cualificados y oportunidades globales.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-blue-600 font-bold text-3xl mb-2">15K+</div>
                <div className="text-gray-600">Profesionales Registrados</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-blue-600 font-bold text-3xl mb-2">98%</div>
                <div className="text-gray-600">Satisfacción Cliente</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-blue-600 font-bold text-3xl mb-2">50K+</div>
                <div className="text-gray-600">Proyectos Completados</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-blue-600 font-bold text-3xl mb-2">25+</div>
                <div className="text-gray-600">Países Alcanzados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nos guiamos por principios sólidos que garantizan la excelencia y la confianza en cada interacción.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-blue-600 mb-4">
                <Shield className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Calidad Verificada</h3>
              <p className="text-gray-600">
                Cada profesional pasa por un riguroso proceso de verificación para garantizar los más altos estándares de calidad.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-blue-600 mb-4">
                <Target className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Matching Inteligente</h3>
              <p className="text-gray-600">
                Nuestra tecnología de vanguardia asegura las conexiones más relevantes entre profesionales y oportunidades.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-blue-600 mb-4">
                <Star className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Excelencia Garantizada</h3>
              <p className="text-gray-600">
                Nos comprometemos con la satisfacción total, respaldando cada proyecto con garantías sólidas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Casos de Éxito</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Historias reales de profesionales y empresas que han transformado su futuro a través de nuestra plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="Ana Martínez"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Ana Martínez</h4>
                  <p className="text-gray-600">Diseñadora UX/UI</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Gracias a Briisa.app, he podido expandir mi cartera de clientes internacionales y trabajar en proyectos verdaderamente innovadores."
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="Carlos Ruiz"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Carlos Ruiz</h4>
                  <p className="text-gray-600">Desarrollador Full-Stack</p>
                </div>
              </div>
              <p className="text-gray-600">
                "La plataforma me ha permitido encontrar proyectos desafiantes y construir relaciones duraderas con clientes de todo el mundo."
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="Laura Sánchez"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Laura Sánchez</h4>
                  <p className="text-gray-600">Marketing Digital</p>
                </div>
              </div>
              <p className="text-gray-600">
                "El proceso de verificación y la calidad de los clientes en la plataforma han hecho que mi experiencia sea excepcional."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Nuestra Visión</h2>
              <div className="prose prose-lg text-blue-100">
                <p>
                  Aspiramos a ser la plataforma líder en la conexión de talento profesional en España y Europa, revolucionando la manera en que los profesionales encuentran y desarrollan oportunidades globales.
                </p>
                <p className="mt-4">
                  Nuestro objetivo es crear un ecosistema donde la excelencia profesional no conozca fronteras, permitiendo que el talento español brille en el escenario mundial.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Globe className="w-6 h-6 mr-2" />
                  <span>Expansión Global</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 mr-2" />
                  <span>Comunidad Fuerte</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-6 h-6 mr-2" />
                  <span>Excelencia</span>
                </div>
                <div className="flex items-center">
                  <Rocket className="w-6 h-6 mr-2" />
                  <span>Innovación</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                alt="Equipo Briisa"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;