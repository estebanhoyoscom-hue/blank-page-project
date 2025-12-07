export type QuestionType = 'word' | 'scale' | 'yesno' | 'frequency' | 'multiselect';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  scaleLabels?: { low: string; high: string };
}

export interface TestBlock {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  questions: Question[];
}

export const assessmentBlocks: TestBlock[] = [
  {
    id: 'stress',
    title: 'Estrés',
    subtitle: 'Evaluemos tu carga mental',
    icon: 'Zap',
    color: 'hsl(var(--primary))',
    questions: [
      {
        id: 'stress-1',
        type: 'word',
        text: 'En una palabra, ¿cómo describirías tu nivel de estrés estos días?',
      },
      {
        id: 'stress-2',
        type: 'yesno',
        text: '¿Sueles sentir que tienes más cosas por hacer de las que alcanzas a manejar?',
      },
      {
        id: 'stress-3',
        type: 'yesno',
        text: '¿Te cuesta desconectar de tus responsabilidades cuando termina tu jornada?',
      },
      {
        id: 'stress-4',
        type: 'yesno',
        text: '¿Sientes que lo que haces vale la pena, o más bien se siente como una carga constante?',
        options: ['Vale la pena', 'A veces', 'Es una carga'],
      },
      {
        id: 'stress-5',
        type: 'scale',
        text: '¿Qué tan estresado/a dirías que te has sentido esta semana?',
        scaleLabels: { low: 'Relajado', high: 'Muy estresado' },
      },
    ],
  },
  {
    id: 'anxiety',
    title: 'Ansiedad',
    subtitle: 'Exploremos tus preocupaciones',
    icon: 'Brain',
    color: 'hsl(280, 70%, 55%)',
    questions: [
      {
        id: 'anxiety-1',
        type: 'yesno',
        text: '¿Sientes que tu mente está muy llena de preocupaciones últimamente?',
      },
      {
        id: 'anxiety-2',
        type: 'yesno',
        text: '¿Hay pensamientos que se te repiten una y otra vez y te cuesta apagar?',
      },
      {
        id: 'anxiety-3',
        type: 'scale',
        text: '¿Qué tan ansioso/a dirías que te has sentido esta semana?',
        scaleLabels: { low: 'Tranquilo', high: 'Muy ansioso' },
      },
      {
        id: 'anxiety-4',
        type: 'multiselect',
        text: '¿Con qué frecuencia has experimentado estos síntomas?',
        options: [
          'Aceleración del corazón',
          'Tensión muscular',
          'Dificultad para respirar',
          'Problemas de sueño',
          'Ninguno',
        ],
      },
      {
        id: 'anxiety-5',
        type: 'frequency',
        text: '¿En qué medida la ansiedad ha interferido con tus actividades diarias?',
      },
    ],
  },
  {
    id: 'mood',
    title: 'Estado de Ánimo',
    subtitle: 'Revisemos cómo te sientes',
    icon: 'Heart',
    color: 'hsl(200, 70%, 50%)',
    questions: [
      {
        id: 'mood-1',
        type: 'yesno',
        text: '¿Te cuesta levantarte o arrancar el día, como si todo pesara más de lo normal?',
      },
      {
        id: 'mood-2',
        type: 'yesno',
        text: '¿Te has sentido más desconectado/a de las personas o actividades que te importan?',
      },
      {
        id: 'mood-3',
        type: 'yesno',
        text: '¿Hay cosas que antes disfrutabas y que ahora te dan igual o te cuestan más?',
      },
      {
        id: 'mood-4',
        type: 'scale',
        text: '¿Qué tan animado/a dirías que te has sentido esta semana?',
        scaleLabels: { low: 'Sin ánimo', high: 'Muy animado' },
      },
      {
        id: 'mood-5',
        type: 'frequency',
        text: '¿En qué medida tu estado de ánimo ha interferido con tus actividades diarias?',
      },
    ],
  },
];
