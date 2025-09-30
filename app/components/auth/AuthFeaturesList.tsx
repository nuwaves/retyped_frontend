import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface Feature {
  icon: IconDefinition;
  title: string;
  description: string;
}

interface AuthFeaturesListProps {
  features: Feature[];
}

export default function AuthFeaturesList({ features }: AuthFeaturesListProps) {
  return (
    <div className="hidden lg:block flex-1 max-w-md">
      <div className="space-y-8">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <FontAwesomeIcon icon={feature.icon} className="w-4 h-4 text-gray-700" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1 text-[13.78px] leading-[21px]">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-normal text-[12.11px] leading-[19.91px]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}