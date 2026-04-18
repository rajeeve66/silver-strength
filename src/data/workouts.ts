import { WorkoutDay } from '../types';

export const workouts: WorkoutDay[] = [
  {
    day: 'Monday',
    focus: 'Chest & Triceps',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50 border-orange-200',
    exercises: [
      {
        name: 'Incline Dumbbell Press',
        sets: 3,
        reps: '10–12',
        safeFormTip: 'Set incline to 30–45°. Keep elbows at 45° angle to protect shoulder joints. Lower slowly to a 2-second count.',
      },
      {
        name: 'Flat Dumbbell Flyes',
        sets: 2,
        reps: '12',
        safeFormTip: 'Maintain a slight bend in elbows throughout. Do not stretch arms too wide — stop when you feel a mild chest stretch.',
      },
      {
        name: 'Seated Machine Chest Press',
        sets: 3,
        reps: '10–12',
        safeFormTip: 'Adjust seat so handles align with mid-chest. Avoid locking elbows at full extension. Machine is gentler on wrists than free weights.',
      },
      {
        name: 'Cable Tricep Pushdown',
        sets: 3,
        reps: '12',
        safeFormTip: 'Keep upper arms pinned to your sides. Use a rope or straight bar. Squeeze triceps at the bottom; do not let elbows flare.',
      },
      {
        name: 'Overhead Dumbbell Extension',
        sets: 2,
        reps: '12',
        safeFormTip: 'Support the working elbow with your free hand. Keep movement slow and controlled. Use lighter weight to protect the elbow joint.',
      },
    ],
  },
  {
    day: 'Tuesday',
    focus: 'Back & Biceps',
    color: 'text-sky-700',
    bgColor: 'bg-sky-50 border-sky-200',
    exercises: [
      {
        name: 'Lat Pulldown (Wide Grip)',
        sets: 3,
        reps: '10–12',
        safeFormTip: 'Pull the bar to your upper chest, not behind your neck. Lean back slightly. Avoid behind-the-neck pulldowns — they strain the cervical spine.',
      },
      {
        name: 'Seated Cable Row',
        sets: 3,
        reps: '12',
        safeFormTip: 'Keep spine neutral and chest tall throughout. Pull with your elbows, not your hands. Squeeze shoulder blades together at the end.',
      },
      {
        name: 'One-Arm Dumbbell Row',
        sets: 3,
        reps: '10–12 each',
        safeFormTip: 'Rest your non-working hand and knee on a flat bench. Keep your back parallel to the floor. Do not rotate the torso.',
      },
      {
        name: 'Dumbbell Bicep Curl',
        sets: 3,
        reps: '12',
        safeFormTip: 'No swinging or using momentum. Lower the weight slowly over 3 seconds. Keep wrists straight to protect tendons.',
      },
      {
        name: 'Hammer Curl',
        sets: 2,
        reps: '12',
        safeFormTip: 'Neutral grip (thumbs up) reduces elbow and wrist strain. Curl to shoulder height only. Excellent choice for joint-friendly bicep work.',
      },
    ],
  },
  {
    day: 'Wednesday',
    focus: 'Legs',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50 border-emerald-200',
    exercises: [
      {
        name: 'Leg Press Machine',
        sets: 3,
        reps: '12',
        safeFormTip: 'Place feet shoulder-width, slightly high on the platform. Never lock knees at the top. Do not let knees cave inward during the push.',
      },
      {
        name: 'Leg Extension',
        sets: 3,
        reps: '12',
        safeFormTip: 'Use moderate weight only. Extend fully but pause briefly before lowering. Slow, controlled movement protects the patellar tendon.',
      },
      {
        name: 'Lying Leg Curl',
        sets: 3,
        reps: '12',
        safeFormTip: 'Keep hips pressed into the pad — avoid raising your glutes. Curl to 90° only if knee flexibility allows. Focus on hamstring contraction.',
      },
      {
        name: 'Goblet Squat (with Dumbbell)',
        sets: 2,
        reps: '12',
        safeFormTip: 'Hold dumbbell at chest level. Keep heels flat on the floor. Squat only as deep as comfortable — partial range is perfectly fine for joint health.',
      },
      {
        name: 'Standing Calf Raise',
        sets: 3,
        reps: '15',
        safeFormTip: 'Use a step edge for full range. Rise slowly and hold at the top for 1 second. Calves respond well to controlled, full-range repetitions.',
      },
    ],
  },
  {
    day: 'Thursday',
    focus: 'Shoulders',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50 border-amber-200',
    exercises: [
      {
        name: 'Seated Dumbbell Press',
        sets: 3,
        reps: '10–12',
        safeFormTip: 'Sit with back support. Do not press overhead to full lockout — stop a few inches short. Keep core braced. Seated position reduces spinal load.',
      },
      {
        name: 'Lateral Raise',
        sets: 3,
        reps: '12',
        safeFormTip: 'Raise arms only to shoulder height — going higher impinges the rotator cuff. Slight bend in elbows. Use lighter weight for better control.',
      },
      {
        name: 'Front Raise',
        sets: 2,
        reps: '12',
        safeFormTip: 'Alternate arms to reduce shoulder strain. Keep a slight elbow bend. Raise to eye level only. Avoid momentum — use slow, deliberate movement.',
      },
      {
        name: 'Face Pull (Cable or Band)',
        sets: 3,
        reps: '15',
        safeFormTip: 'Excellent for rotator cuff health. Pull to nose level, flare elbows out. This exercise actively counteracts age-related shoulder deterioration.',
      },
      {
        name: 'Dumbbell Shrug',
        sets: 2,
        reps: '12',
        safeFormTip: 'Lift straight up — do not roll shoulders in circles, which causes joint grinding. Hold at the top for 1 second. Use a comfortable, not maximal, weight.',
      },
    ],
  },
  {
    day: 'Friday',
    focus: 'Mobility & Core',
    color: 'text-teal-700',
    bgColor: 'bg-teal-50 border-teal-200',
    exercises: [
      {
        name: 'Bird Dog',
        sets: 3,
        reps: '10 each side',
        safeFormTip: 'Start on hands and knees. Extend opposite arm and leg simultaneously. Keep spine perfectly neutral — imagine balancing a cup of water on your back.',
      },
      {
        name: 'Dead Bug',
        sets: 3,
        reps: '10 each side',
        safeFormTip: 'Press your lower back firmly into the floor throughout. Move opposite arm and leg slowly. This is one of the safest core exercises for the lumbar spine.',
      },
      {
        name: 'Plank Hold',
        sets: 3,
        reps: '30–45 seconds',
        safeFormTip: 'Forearm plank is gentler on wrists. Keep hips level — neither sagging nor raised. Breathe steadily. Stop if you feel lower back discomfort.',
      },
      {
        name: 'Cat-Cow Stretch',
        sets: 3,
        reps: '10 slow cycles',
        safeFormTip: 'Coordinate with your breath: arch up (cat) on exhale, lower belly (cow) on inhale. Extremely therapeutic for spinal discs and lumbar health.',
      },
      {
        name: 'Hip Flexor Stretch (Lunge)',
        sets: 3,
        reps: '30 sec each side',
        safeFormTip: 'Low lunge position, back knee on a mat. Gently push hips forward — no bouncing. Tight hip flexors are common in older adults and cause back pain.',
      },
    ],
  },
];
