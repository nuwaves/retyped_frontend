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

const styles = {
  container: "hidden lg:block flex-1 max-w-md",
  list: "space-y-8",
  featureItem: "flex gap-4 items-start",
  iconContainer: "flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center",
  icon: "w-4 h-4 text-gray-700",
  textContainer: "flex-1",
  title: "font-medium text-gray-900 mb-1 text-[13.78px] leading-[21px]",
  description: "text-gray-600 font-normal text-[12.11px] leading-[19.91px]"
};

export default function AuthFeaturesList({ features }: AuthFeaturesListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={feature.icon} className={styles.icon} />
            </div>
            <div className={styles.textContainer}>
              <p className={styles.title}>
                <strong>{feature.title}</strong>
              </p>
              <p className={styles.description}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}