import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const mobileDeviceEducation = {
  title: 'Proper Disposal of Mobile Devices',
  image: 'https://picsum.photos/id/1/600/400',
  description: 'Learn the best practices for disposing of mobile devices responsibly.',
  sections: [
    {
      heading: 'Why Proper Disposal Matters',
      type: 'text',
      content: 'Improper disposal of mobile devices can lead to environmental pollution and health hazards. Proper disposal helps in recycling valuable materials and prevents harmful chemicals from leaching into the soil and water.'
    },
    {
      heading: 'Steps for Disposal',
      type: 'list',
      content: [
        'Identify Mobile Devices: Determine which mobile devices are no longer in use and classify them as e-waste.',
        'Data Security: Ensure all personal data is wiped from the devices.',
        'Drop-off Points: Locate authorized e-waste recycling centers or collection points for mobile devices.',
        'Manufacturer Take-Back Programs: Some manufacturers offer take-back or recycling programs for their products.',
        'Donate if Usable: If the mobile devices are still functional, consider donating them to schools or non-profit organizations.'
      ]
    },
    {
      heading: 'Authorized Recycling Centers',
      type: 'text',
      content: 'Find your nearest e-waste recycling center for mobile devices using the link below.',
      link: '/consumer/hotspots'
    }
  ]
};

const MobileDevicesDetail = () => {
  return (
    <>
      <section>
        <img src={mobileDeviceEducation.image} alt={mobileDeviceEducation.title} className='h-64 w-full object-cover' />
        <div className='p-6'>
          <h1 className='text-3xl font-semibold mb-4'>
            {mobileDeviceEducation.title}
          </h1>
          <p className='text-gray-700 mb-6'>
            {mobileDeviceEducation.description}
          </p>

          {mobileDeviceEducation.sections.map((section, index) => (
            <div key={index} className='mb-14'>
              <h3 className='text-2xl font-semibold mb-2'>
                {section.heading}
              </h3>
              {section.type === 'text' ? (
                <p className='text-gray-600 mb-2'>
                  {section.content}
                </p>
              ) : (
                <ol className='list-decimal list-inside text-gray-600 mb-2'>
                  {section.content.map((item, i) => (
                    <li key={i} className='mb-2'>
                      {item}
                    </li>
                  ))}
                </ol>
              )}
              {section.link && (
                <Link to={section.link} className='text-blue-500 hover:underline'>
                  Find Recycling Centers
                </Link>
              )}
            </div>
          ))}

          <Link to="/consumer/education">
            <Button className='bg-gray-300 text-gray-900 hover:bg-gray-400 px-4 py-2 rounded-md'>
              Back to Education
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default MobileDevicesDetail;
