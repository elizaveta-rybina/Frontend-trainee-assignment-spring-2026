import { Box, CircularProgress, Container, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { BasicFieldsSection } from '@/modules/ads/components/AdEdit/BasicFieldsSection'
import { DescriptionSection } from '@/modules/ads/components/AdEdit/DescriptionSection'
import { EditActions } from '@/modules/ads/components/AdEdit/EditActions'
import { ParamsSection } from '@/modules/ads/components/AdEdit/ParamsSection'
import { SaveToast } from '@/modules/ads/components/AdEdit/SaveToast'
import { aiButtonStyles, warningInputSx } from '@/pages/AdEdit/model/utils'
import { useAdEditPage } from '@/shared/hooks/useAdEditPage'

export const AdEdit = () => {
	const { id } = useParams()
	const numericId = Number(id)
	const isInvalidId = !Number.isFinite(numericId)
	const navigate = useNavigate()

	const {
		formData,
		isFetching,
		isSaving,
		priceAi,
		descAi,
		toast,
		fieldsConfig,
		isTitleMissing,
		isPriceMissing,
		isSaveDisabled,
		handleChange,
		handleParamChange,
		handleClearTitle,
		handleClearPrice,
		handleClearParam,
		handlePriceAiRequest,
		handlePriceApply,
		handlePriceAiClose,
		handleDescAiRequest,
		handleDescApply,
		handleDescAiClose,
		handleSave,
		closeToast
	} = useAdEditPage({ numericId, isInvalidId, navigate })

	if (isFetching || !formData) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Container maxWidth='xl' sx={{ py: 4, pb: 10 }}>
			<Typography
				variant='h2'
				fontWeight={500}
				lineHeight={1.2}
				fontSize={30}
				marginBottom={'18px'}
			>
				Редактирование объявления
			</Typography>

			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<BasicFieldsSection
					formData={formData}
					isTitleMissing={isTitleMissing}
					isPriceMissing={isPriceMissing}
					aiButtonStyles={aiButtonStyles}
					onTitleChange={value => handleChange('title', value)}
					onPriceChange={value => handleChange('price', value)}
					onClearTitle={handleClearTitle}
					onClearPrice={handleClearPrice}
					priceAi={priceAi}
					onPriceAiRequest={handlePriceAiRequest}
					onPriceApply={handlePriceApply}
					onPriceAiClose={handlePriceAiClose}
				/>

				<ParamsSection
					fieldsConfig={fieldsConfig}
					params={formData.params}
					warningInputSx={warningInputSx}
					onParamChange={handleParamChange}
					onClearParam={handleClearParam}
				/>

				<Box
					sx={{ height: '1px', bgcolor: '#F0F0F0', width: '100%', my: '18px' }}
				/>

				<DescriptionSection
					description={formData.description ?? ''}
					aiButtonStyles={aiButtonStyles}
					onDescriptionChange={value => handleChange('description', value)}
					descAi={descAi}
					onDescAiRequest={handleDescAiRequest}
					onDescApply={handleDescApply}
					onDescAiClose={handleDescAiClose}
				/>

				<Box sx={{ mt: 4 }}>
					<EditActions
						isSaving={isSaving}
						isSaveDisabled={isSaveDisabled}
						onSave={handleSave}
						onCancel={() => navigate(`/ads/${numericId}`)}
					/>
				</Box>
			</Box>

			<SaveToast toast={toast} onClose={closeToast} />
		</Container>
	)
}
