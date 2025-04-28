import { Link } from 'react-router-dom';

const SimplePresentPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Simple Present Tense</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">What is the Simple Present?</h2>
        <p className="mb-4 text-gray-700">
          The Simple Present is a verb tense used to describe:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
          <li>Habits and routines (I <span className="font-bold">eat</span> breakfast every day)</li>
          <li>General truths (The sun <span className="font-bold">rises</span> in the east)</li>
          <li>Fixed arrangements (The train <span className="font-bold">leaves</span> at 8 PM)</li>
          <li>Permanent situations (I <span className="font-bold">live</span> in New York)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Formation Rules</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium text-blue-500 mb-3">Affirmative Form</h3>
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-3 border text-left">Subject</th>
                <th className="p-3 border text-left">Verb Form</th>
                <th className="p-3 border text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 border">I, You, We, They</td>
                <td className="p-3 border">Base form</td>
                <td className="p-3 border">They <span className="font-bold">play</span> soccer</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 border">He, She, It</td>
                <td className="p-3 border">Base form + <span className="text-red-500">s/es</span></td>
                <td className="p-3 border">She <span className="font-bold">plays</span> tennis</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm text-gray-600">
            * Verbs ending in -ch, -sh, -ss, -x, or -o add <span className="font-bold">-es</span> (watch → watches)
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium text-blue-500 mb-3">Negative Form</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-2"><span className="font-bold">Do not/Don't</span> + base form (I, you, we, they)</p>
            <p className="mb-2">Example: They <span className="font-bold">don't like</span> coffee.</p>
            <p className="mb-2"><span className="font-bold">Does not/Doesn't</span> + base form (he, she, it)</p>
            <p>Example: He <span className="font-bold">doesn't eat</span> meat.</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium text-blue-500 mb-3">Question Form</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-2"><span className="font-bold">Do</span> + subject + base form (I, you, we, they)</p>
            <p className="mb-2">Example: <span className="font-bold">Do</span> you <span className="font-bold">speak</span> English?</p>
            <p className="mb-2"><span className="font-bold">Does</span> + subject + base form (he, she, it)</p>
            <p>Example: <span className="font-bold">Does</span> she <span className="font-bold">work</span> here?</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Common Time Expressions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="font-medium">Every day/week/month</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="font-medium">Always</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="font-medium">Usually</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="font-medium">Often</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="font-medium">Sometimes</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="font-medium">Never</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Examples</h2>
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-medium">Affirmative:</p>
            <p>- I <span className="font-bold">work</span> at a bank.</p>
            <p>- She <span className="font-bold">studies</span> French.</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="font-medium">Negative:</p>
            <p>- We <span className="font-bold">don't watch</span> TV in the morning.</p>
            <p>- It <span className="font-bold">doesn't rain</span> much here.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium">Questions:</p>
            <p>- <span className="font-bold">Do</span> you <span className="font-bold">like</span> pizza?</p>
            <p>- <span className="font-bold">Does</span> your brother <span className="font-bold">play</span> guitar?</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Special Cases</h2>
        <div className="space-y-3">
          <p className="text-gray-700"><span className="font-bold">Verb "to be":</span> I am, you are, he/she/it is</p>
          <p className="text-gray-700"><span className="font-bold">Verb "to have":</span> He/She/It has</p>
          <p className="text-gray-700"><span className="font-bold">Modal verbs:</span> Always use base form (can, should, must)</p>
        </div>
      </section>

      <div className="flex justify-between mt-8">
        <Link to="/docs" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          ← Back to Home
        </Link>
        <Link to="/content" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Practice Exercises →
        </Link>
      </div>
    </div>
  );
};

export default SimplePresentPage;